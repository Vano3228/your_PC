import './ComponentItem.scss'
function ComponentItem({component}){
    return(
        <div className="component-item">
            <h3>{component.name}</h3>
            <p>{component.characteristics}</p>
            <p>Магазин {component.shop}</p>
            <a href={component.url} target={'_blank'}>
                Ссылка на товар
            </a>
            <p className={'price'}>{component.price}</p>
        </div>
    )
}

export default ComponentItem