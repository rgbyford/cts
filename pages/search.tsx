import * as React from 'react';
import { getList, getContacts } from './public';
//import ComboSelect from 'react-combo-select';
//require('../node_modules/react-combo-select/style.css');
import Header from '../components/Header';
import withLayout from '../lib/withLayout';
//import PropTypes from 'prop-types';

//const NUM_ANDS = 4;
type oMod = {
  id: number,
  GivenName: string,
  FamilyName: string,
  "E-mail1-Value": string,
  'Phone1-Value': string,
  Photo1: string,
  FC_ID1: string,
  FC_ID2: string,
  url: string
};

type OCat = {
  sIsSubCatOf: string,
  sThisCat: string,
  key: number
};

type CSRState = {
  list: OCat[],
  loading: boolean,
  sAddCat: string[],
  aoFound: oSearch[],
  iCounter: number
};  

class oSearch {
  iSearches: number;
  sSearch: string;
  asSelect: string[];
  bNext: boolean;
  bAnd: boolean;
  bSearch: boolean;
  sSubCatOf: string;
  iCatSearches: number;
  bComplete: boolean;
  aoCatsList: OCat[];
  sCat: string[];
  bAllowMult: boolean;
  iCatSearchesMax: number;

  constructor () {
    this.iSearches = 0,
    this.sSearch = "",
    this.asSelect = [],
    this.bNext = false,
    this.bAnd = false,
    this.bSearch = true,
    this.sSubCatOf = "",
    this.iCatSearches = 0,
    this.bComplete = false,
    this.aoCatsList = [],
    this.sCat = [],
    this.bAllowMult = false,
    this.iCatSearchesMax = 0
  }
};

let aiCatsSelected: number[] = [];
let aoSearch = {} as oSearch [];
aoSearch[0] = new oSearch;
aoSearch[0].bNext = true;
let bRefining: boolean;
//let sSubCatOf: string;

let iTotalRows = 0;   // easy way, rather than checking aoSearch

class CSRWithData extends React.Component<{}, CSRState> {
  state: CSRState;
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      sAddCat: [],
      aoFound: [],
      iCounter: 0
    }
    this.nextButton = this.nextButton.bind(this);
    this.andButton = this.andButton.bind(this);
    this.searchButton = this.searchButton.bind(this);
    //sSubCatOf = "";
    //iAnds = 0;
    //asSearchStrings = [];
    //asSearchStrings[0] = "";
    aiCatsSelected[0] = 0;
  }

  async componentDidMount() {
    try {
      iTotalRows = 1;
      bRefining = false;
      console.log ("CDM before gL call");
      const list = await getList();
      console.log("CDM:", list);
      this.setState({ // eslint-disable-line
        list: list,
        loading: false,
      });
      //bCatSelected = false;
    } catch (err) {
//      this.setState({ loading: false, error: err.message || err.toString() }); // eslint-disable-line
      this.setState({ loading: false }); // eslint-disable-line
    }
  }

  async searchButton () {
    console.log ("Search button");
    bRefining = true;
    let asSearch: string[] = [];  // api is written to use array of strings
    for (let i = 0; i < iTotalRows; i++) {
      asSearch[i] = aoSearch[i].sSearch;
    }
    let aoContacts = await getContacts(asSearch);
    console.log ("aoFound: ", aoContacts);
    this.setState ({aoFound: aoContacts});
    return;
  }

  // Add category to search.  Selection is in e.target.options.  iRow is the search row
  catAddSelect = (e: React.ChangeEvent<HTMLSelectElement>, iRow: number) => {
    console.log ("Need to debug this");
    aoSearch[iRow].sCat = [].filter.call(e.target.options, (o: any) => o.selected).map((o: any) => o.value);
   
    //aoSearch[iRow].sCat = [...e.target.options].filter(({selected}) => selected).map(({value}) => value)
    //aoSearch[iRow].sCat = e.target.value;
    //aoSearch[iRow].sCat = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
    console.log ("catAddSelect: ", aoSearch[iRow].sCat);
  }

  andButton = (param: number) => () => {
    aoSearch[param].bAnd = false;
    aoSearch[param].bSearch = false;
    console.log ('AND iCatSearches: ', aoSearch[param].iCatSearches);
    //if (aoSearch[param].iCatSearches < 3) {
      //bRefining = true;
    //}
    iTotalRows++;
    aoSearch[iTotalRows - 1] = new oSearch;
    aoSearch[iTotalRows - 1].bNext = true;
    this.setState ({iCounter: this.state.iCounter++});    // just to cause refresh
  }
  
  nextButton = (param: number) => () => {
    // param is the argument you passed to the function
    // e is the event object that returned
    console.log ("next button: ", param, aoSearch[param].iCatSearches);
    aoSearch[param].iCatSearches++;
    if (aoSearch[param].sSearch != "") {
      aoSearch[param].sSearch += ' _ ';
    }
    if (aoSearch[param].iCatSearches < 3  && aoSearch[param].sCat.length < 2) {     // < 2 ==> not OR
      console.log ('sCat: ', aoSearch[param].sCat);
      console.log ('sCat length: ', aoSearch[param].sCat.length);
      aoSearch[param].bComplete = false;
      if (aoSearch[param].iCatSearches > 0) {
        aoSearch[param].bAnd = true;
      }
    }
    else {
      aoSearch[iTotalRows - 1].bComplete = true;
      aoSearch[iTotalRows - 1].bAnd = false;
      aoSearch[iTotalRows - 1].bNext = false;
      aoSearch[iTotalRows - 1].bSearch = false;
      iTotalRows++;
      aoSearch[iTotalRows - 1] = new oSearch;
      aoSearch[iTotalRows - 1].bNext = true;
    }
    aoSearch[param].sSearch += aoSearch[param].sCat.join (' OR '); // only puts in OR if there's more than one item in sCat?
    console.log ("searchString: ", aoSearch[param].sSearch);
    aoSearch[param].sSubCatOf = aoSearch[param].sCat[0];
    console.log ('asSubCatOf: ', aoSearch[param].sCat[0]);
    //sSubCatOf = this.sCat[0];          // deal with the fact that this is an array
    //aiCatsSelected[param]++;
    if (bRefining) {
      this.searchButton ();      // fake it
    }
    else {
      this.setState ({iCounter: this.state.iCounter++});    // just to cause refresh
    }
  }

  csr(state: any) {
    for (let iRow = 0; iRow < iTotalRows; iRow++) {
    console.log('iTR, iRow, iCatSearches: ', iTotalRows, iRow, aoSearch[iRow].iCatSearches);
      aoSearch[iRow].aoCatsList = [];
      if (aoSearch[iRow].iCatSearches < 3) {
        console.log('aoS[iR].sSCO: ', aoSearch[iRow].sSubCatOf);
        // work out select elements
        let j = 0;
        for (let i = 0; i < state.list.aoCats.length; i++) {
          if (state.list.aoCats[i].sIsSubCatOf === aoSearch[iRow].sSubCatOf) {
            aoSearch[iRow].aoCatsList.push(state.list.aoCats[i]);
            aoSearch[iRow].aoCatsList[j].key = j++;
          }
        }
      }
      aoSearch[iRow].bAllowMult = aoSearch[iRow].sSubCatOf === '' ? false : true;
      if (aoSearch[iRow].aoCatsList.length < 2) {   // can't search a list of 1
        console.log ('short row: ', iRow, aoSearch[iRow].aoCatsList.length);
        aoSearch[iRow].bComplete = true; 
        aoSearch[iRow].bNext = false;
        aoSearch[iRow].iCatSearchesMax = 2;
      }
    }

    let aoFoundPeople = {} as  oMod[];
    if(state.aoFound !== undefined) {
      aoFoundPeople = state.aoFound.aoFound;
      aoFoundPeople.sort((a: oMod, b: oMod) => (a.FamilyName > b.FamilyName) ? 1 :
       (b.FamilyName > a.FamilyName) ? -1 : 
       ((a.GivenName > b.GivenName) ? 1 : (b.GivenName > a.GivenName) ? -1 : 0));
      //console.log ("aoFound", state.aoFound.aoFound[0].FamilyName);
    }
    else {
      aoFoundPeople = [];
    }
//    this.aoFound.map((x, y) => console.log (x.FamilyName));

    for (let i = 0; i < aoFoundPeople.length; i++) {
      aoFoundPeople[i].url = `https://app.fullcontact.com/contacts/${aoFoundPeople[i].FC_ID1}/${aoFoundPeople[i].FC_ID2}`;
//      console.log ('URL: ', aoFoundPeople[i].url);
    }
    console.log ('aoSearch len', aoSearch.length);
    console.log ('aoCatsList: ', aoSearch[0].aoCatsList);
    return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      {Header ()}
      <h2>Search page</h2>
      <strong>
        {aoSearch.map((oSrch,index1) => <div key={index1}>
          <div><p>{oSrch.sSearch}</p></div>
          {oSrch.bComplete ? '' :
            <div><select size={10} multiple={oSrch.bAllowMult ? true : false} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.catAddSelect(e, index1)}>
            {oSrch.aoCatsList.map((value2, index2) => <option key = {index2}> {value2.sThisCat} </option>)}
          </select></div>}
          <div>{oSrch.bNext ? <button onClick={this.nextButton(index1)}>Next</button> : ''}</div>
          <div>{oSrch.bAnd ? <button onClick={this.andButton(index1)}>AND</button> : ''}</div>
          <div>{oSrch.bSearch ? <button onClick={this.searchButton}>Search</button> : ''}</div>
          </div>)}
      {aoFoundPeople.map((x: oMod, y: number) => <div key={y}>
        <p>{x.GivenName} {x.FamilyName} &nbsp;&nbsp;
        {x['Phone1-Value']}&nbsp;&nbsp;{x['E-mail1-Value']}</p>
        <img style={{width: 100}} src={x.Photo1}/>
        &nbsp;
        {x.FC_ID1 != undefined ? <a target="_blank" href={x.url}><strong>FullContact</strong></a> : ''}
      </div>)}
    </strong>
    </div>
    );
}


  render() {
    console.log (`render CSRWD: |`, {...this.state});
    // state has members as above - list is null on the first call, is {aoCats[]} on the second call
    // and loading true on the first call, false on the second
    // return <CSR {...this.props} {...this.state} />;
   return (<div> {this.csr ({...this.state})} </div>);
  }
}

export default withLayout(CSRWithData);
