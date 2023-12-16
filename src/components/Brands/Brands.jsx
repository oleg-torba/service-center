import brandCss from './brands.module.css'
export function Brands () {
    return (
   <section className='section'>
         <div className={brandCss.main}>
            <button className={brandCss.btn}>
            <p>Apple</p>
        </button>
        <button className={brandCss.btn}>
            <p>Samsung</p>
        </button>
        <button className={brandCss.btn}>
            <p>Xiaomi</p>
        </button>
        <button className={brandCss.btn}>
            <p>Huawei</p>
        </button>
        <button className={brandCss.btn}>
            <p>Olcal</p>
        </button>
        <button className={brandCss.btn}>
            <p>Tecno</p>
        </button>
        <button className={brandCss.btn}>
            <p>Oppo</p>
        </button>
        <button className={brandCss.btn}>
            <p>Realme</p>
        </button>
        <button className={brandCss.btn}>
            <p>ZTE</p>
        </button>

        </div>
   </section>
    )
}