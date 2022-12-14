import React from 'react';

const NFTItem = (props) => {
    return (
        <div className="NFTItem cursor-pointer" onClick={() => props.selectNFT(props.id)}>
            <div className='title'>{props.title}</div>
            <img src={props.url}/>
            <div className={'selectbtn ' + (props.selected == props.id ? 'selected' : '')}>select</div>
        </div>
    );
}

export default NFTItem;