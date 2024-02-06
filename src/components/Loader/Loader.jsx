import LoaderCss from './Loader.module.css';

const Loader = () => {
  return (
    <div className={LoaderCss.container}>
      <div className={LoaderCss.loader}></div>
    </div>
  );
};

export default Loader;
