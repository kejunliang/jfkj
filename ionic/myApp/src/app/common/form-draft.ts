import { Injectable } from '@angular/core';

@Injectable()

export class FormDrafts {

  getSavedFiles(fromtype) {
    let filesArray = [];
    let file = localStorage.getItem(fromtype);
    if (file) {
      filesArray = JSON.parse(file);
    }
    else {
      filesArray = [];
    }
    return filesArray;
  };
  deleteFile(draft, fromtype) {
    let filesArray = [];
    let file = localStorage.getItem(fromtype);
    if (file) {
      filesArray = JSON.parse(file);
    }
    for (let j = 0; j < filesArray.length; j++) {
      if (draft == filesArray[j].name) {
        let index = j;
        filesArray.splice(index, 1);
        localStorage.setItem(fromtype, JSON.stringify(filesArray));
        break;
      }
    };

  };

  saveFiletoBepersisted(newFiles, status, fromtype, draftSavedTime, draftOtherInfo?) {
    console.log('Hello FormDrafts Provider saveFiletoBepersisted ========', newFiles, status, fromtype, draftSavedTime);

    let filesArray = [];
    let file = localStorage.getItem(fromtype);
    if (file) {
      filesArray = JSON.parse(file);
    }
    filesArray.unshift({ name: newFiles, status: status, button: false, savedTime: draftSavedTime, draftOtherInfo: draftOtherInfo });

    //localStorage.setItem(this.FILE_STORAGE_KEY, JSON.stringify(this.filesArray));
    localStorage.setItem(fromtype, JSON.stringify(filesArray));
  };
  updateStatus(fileName,status,fromtype,draftSavedTime){
    let filesArray=[];
    let file=localStorage.getItem(fromtype);
        if(file)
         {
         filesArray = JSON.parse(file);
         }
   for(let k=0;k<filesArray.length;k++)
   {
     if(filesArray[k].name==fileName)
     {
       filesArray[k].status=status;
       filesArray[k].savedTime=draftSavedTime;
       filesArray[k].button=false;
       localStorage.setItem(fromtype, JSON.stringify(filesArray));
        break;
     }
   }
  };
}