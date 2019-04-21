import * as React from 'react';
import Head from 'next-server/head';
import withLayout from '../lib/withLayout';
function Index() {
    return (<div style={{ padding: '10px 45px' }}>
      <Head>
        <title>Prodigium</title>
        <meta name="description" content=""/>
      </Head>
      <style>{`
      body {
        background-image: url("/static/oriental.png");
      }
      `}</style>
      <h1>Prodigium Contact Search</h1>
    </div>);
}
export default withLayout(Index);
//# sourceMappingURL=index.jsx.map