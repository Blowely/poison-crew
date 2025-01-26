import React from "react";
import "./categoriesTree.scss";

function CategoriesTree() {

  const isDesktopScreen = window?.innerWidth > 768;

  return (
    <div style={{height: '100%'}}>
      <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px 0 20px' : '0'}}>
        <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
         Категории
        </div>
      </div>
    </div>
  );
}

export default CategoriesTree;
