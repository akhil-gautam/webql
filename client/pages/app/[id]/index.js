export default function AppDetails() {
  return <div>App/ID/index.js</div>;
}

export async function getServerSideProps({ query }) {
  return {
    notFound: true,
  };
}
