import LoaderCss from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={LoaderCss.container}>
      <div className={LoaderCss.loader}></div>
    </div>
  );
};
