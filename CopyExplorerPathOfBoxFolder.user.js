// ==UserScript==
// @name         Copy explorer path of Box folder
// @description  Add a button on Box website that can copy explorer path of Box folder.
// @namespace    https://github.com/kevinzch/Copy-explorer-path-of-Box-folder
// @version      0.3
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
            // Create button and set button style
            let copyBtn = document.createElement('button');

            let searchBar = document.querySelector('.header-search.prevent-item-deselection.HeaderSearch-isNewQuickSearch');

            // Make basis of url
            const apiUrl = 'app-api/enduserapp/folder/';
            let appHost = Box.prefetchedData['/app-api/enduserapp/current-user'].preview.appHost;

            // Request
            let request = new XMLHttpRequest();

            // Empty Variables which will be reused in click event
            let folderId = '';
            let fullUrl = '';
            let explorerPath = '';
            let jsonObj = null;
            let length = 0;

            // Set button style
            copyBtn.textContent = 'フォルダパスをコピー';
            copyBtn.style.backgroundColor = '#4baf4f';
            copyBtn.style.color = 'white';
            copyBtn.style.borderRadius = '8px';
            copyBtn.style.padding = '0px 20px';

            // Add button to document
            searchBar.appendChild(copyBtn);

            // Add button click listner
            copyBtn.addEventListener('click', function(){
                // Reget folderID and remake full url
                folderId = document.URL.split('/').pop();
                fullUrl = appHost + apiUrl + folderId;

                // Clear explorer path
                explorerPath = 'Box';

                request.open('GET', fullUrl, false);
                request.send();
                jsonObj = JSON.parse(request.responseText);

                length = jsonObj.folder.path.length;

                for (let i = 0; i < length; i++){
                    // Skip 'All files'
                    if (i == 0){
                        continue;
                    }
                    else{
                        explorerPath += '\\' + jsonObj.folder.path[i].name;
                    }
                }
                navigator.clipboard.writeText(explorerPath);
                alert("下記のパスをコピーしました:\r\n" + explorerPath);
            })
        }
        catch (e) {
            setTimeout(() => {
                copyExplorerPath();
            }, 500);
        }
    };

    setTimeout(() => {
        copyExplorerPath();
    }, 100);

})();
