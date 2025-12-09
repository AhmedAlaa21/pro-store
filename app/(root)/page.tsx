const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Home() {
  await delay(2000);
  return <div>Home</div>;
}
