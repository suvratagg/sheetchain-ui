/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sheetchain-ui';
 
 fileChange(element) {
      this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('/api/upload', formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
}
}
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    uploadedFiles: Array < File > ;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {

    }

    fileChange(args) {
    	console.log("File Change Achieved")
        /*this.uploadedFiles = element.target.files;*/
           const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json) => {
        self.spread.fromJSON(json, {});
        setTimeout(() => {
          alert('load successfully');
        }, 0);
      }, (error) => {
        alert('load fail');
      });
    }
    }

    upload() {
       /* let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        console.log(formData)
        this.http.post('/api/upload', formData)
            .subscribe((response) => {
                console.log('response received is ', response);
            })*/
               const self = this;
    const filename = 'exportExcel.xlsx';
    const json = JSON.stringify(self.spread.toJSON());
    self.excelIO.save(json, function (blob) {
      saveAs(blob, filename);
  }, function (e) {
      console.log(e);
  });
    }

}