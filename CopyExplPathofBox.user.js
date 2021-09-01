// ==UserScript==
// @name         Copy explorer path of Box folder
// @description  Add a button on Box website that can copy explorer path of Box folder.
// @namespace    https://github.com/kevinzch/Copy-explorer-path-of-Box-folder
// @version      0.1
// @downloadURL  https://github.com/kevinzch/Copy-explorer-path-of-Box-folder/raw/main/CopyExplPathofBox.user.js
// @author       Kevin
// @include      https://app.box.com/folder/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const copyExplorerPath = () => {
        try {
            let b1 = document.createElement('button');
            b1.textContent = 'コピー';
            let searchbar = document.querySelector('.header-search.prevent-item-deselection.HeaderSearch-isNewQuickSearch');
            searchbar.appendChild(b1);

            b1.addEventListener('click', function(){
                let hiddenPathButton = document.querySelector('button.btn-plain.ItemListBreadcrumbOverflow-menuButton');
                let topOfBreadcrumbList = document.querySelector('ol.ItemListBreadcrumb-list');
                let breadcrumb = topOfBreadcrumbList.querySelectorAll('[class=ItemListBreadcrumb-listItem]');
                let lastBreadcrumb = topOfBreadcrumbList.querySelector('.ItemListBreadcrumb-listItem.is-last>.ItemListBreadcrumb-currentItemTitle');
                let text = 'Box\\';

                hiddenPathButton.click();
                setTimeout(function() {
                    let hiddenList = document.querySelector('div.dropdown-menu-element.dropdown-menu-enabled');
                    let list = hiddenList.querySelectorAll('[data-resin-target=openfolder]');

                    for (let item of list){
                        if ( item.textContent != 'All Files' ){
                            text += item.textContent + "\\";
                        }
                    }

                    for (let item of breadcrumb){
                        text += item.textContent + '\\';
                    }

                    text += lastBreadcrumb.textContent;
                    navigator.clipboard.writeText(text);
                    alert('エクスプローラーパスをコピーしました。');
                },500);
            })
        } catch (e) {
            setTimeout(() => {
                copyExplorerPath();
            }, 500);
        }
    };

    setTimeout(() => {
        copyExplorerPath();
    }, 100);

})();