import Field from "./field";

export default function Home() {
  return (
    <>
      <Field />
      <nav className="corner">
        <a href="https://github.com/Mopra/horadric.dev">source</a>
        <a className="get" href="https://github.com/Mopra/horadric.dev/releases/latest">
          download for windows
        </a>
      </nav>
    </>
  );
}
