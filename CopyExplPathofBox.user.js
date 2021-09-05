// ==UserScript==
// @name         Copy explorer path of Box folder
// @description  Add a button on Box website that can copy explorer path of Box folder.
// @namespace    https://github.com/kevinzch/Copy-explorer-path-of-Box-folder
// @version      0.2
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
            let copyBtn = document.createElement('button');
            copyBtn.textContent = 'フォルダパスをコピー';
            copyBtn.style.backgroundColor = '#4baf4f';
            copyBtn.style.color = 'white';
            copyBtn.style.borderRadius = '8px';
            copyBtn.style.padding = '0px 20px';

            let searchbar = document.querySelector('.header-search.prevent-item-deselection.HeaderSearch-isNewQuickSearch');
            searchbar.appendChild(copyBtn);

            copyBtn.addEventListener('click', function(){
                // Set menu button
                let hiddenPathButton = document.querySelector('button.btn-plain.ItemListBreadcrumbOverflow-menuButton');
                let topOfBreadcrumbList = document.querySelector('ol.ItemListBreadcrumb-list');
                let breadcrumb = topOfBreadcrumbList.querySelectorAll('[class=ItemListBreadcrumb-listItem]');
                let lastBreadcrumb = topOfBreadcrumbList.querySelector('.ItemListBreadcrumb-listItem.is-last>.ItemListBreadcrumb-currentItemTitle');
                let text = "Box\\";

                // Click menu button only if it exists
                if ( hiddenPathButton ){
                    hiddenPathButton.click();

                    setTimeout(function() {
                        let hiddenList = document.querySelector('div.dropdown-menu-element.dropdown-menu-enabled');
                        let list = hiddenList.querySelectorAll('[data-resin-target=openfolder]');

                        for (let item of list){
                            text += item.textContent + "\\";
                        }
                    },200);

                    // Click again to hide menu
                    hiddenPathButton.click();
                }

                setTimeout(function() {
                    for (let item of breadcrumb){
                        text += item.textContent + "\\";
                    }

                    text += lastBreadcrumb.textContent;
                    text = text.replace("All Files\\", "");
                    text = text.replace("すべてのファイル\\", "");
                    navigator.clipboard.writeText(text);
                    alert("下記のパスをコピーしました。\r\n" + text);
                },200);

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