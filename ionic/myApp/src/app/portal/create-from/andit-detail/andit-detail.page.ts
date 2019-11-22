import { Component, OnInit } from '@angular/core';
// import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular'
// import { ActionSheetController} from '@ionic/angular';
// import { Camera } from '@ionic-native/camera/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file'; // 不需要导入

@Component({
  selector: 'app-andit-detail',
  templateUrl: './andit-detail.page.html',
  styleUrls: ['./andit-detail.page.scss'],
})
export class AnditDetailPage implements OnInit {
  public showTips:boolean=false;
  public headerTitle:string;
  public filedData:any=[];
  public selectLabel:any;
  public checkboxArr:any=[];
  constructor(
    public nav :NavController,
    public activeRoute: ActivatedRoute,
    // public actionSheetCtrl: ActionSheetController,
     private storage: Storage,
    //  private transfer: FileTransfer,
    //  private camera: Camera
     ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.headerTitle=params['title'];
      })
      this.storage.get("filed").then(data => {
       
        data.forEach(item => {
          if(item.xtype== 'checkbox'){
            item.options.forEach(k=>{
                k.selected=false;
            })
          }
        });
        this.filedData=data;
        console.log(data)
      })
  }
  //返回
  backTo(){
    console.log(this.filedData)
    this.nav.back()
  }
  //checkbox
  setCheck(item,index){
    console.log(item,index)
    
    if(item.selected ===true){
      this.checkboxArr.push(item.value)
    }else{
      this.checkboxArr.splice(index,1)
    }
    console.log(this.checkboxArr)
  }
    //拍照
  //   getCamera(){
  //     const options: CameraOptions = {
  //       quality: 100,   // 图片质量
  //       destinationType: this.camera.DestinationType.FILE_URI, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
  //       encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
  //       mediaType: this.camera.MediaType.PICTURE, // 媒体类型
  //       sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
  //       allowEdit: true, // 允许编辑
  //       targetWidth: 300, // 缩放图片的宽度
  //       targetHeight: 300, // 缩放图片的高度
  //       saveToPhotoAlbum: false, // 是否保存到相册
  //       correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //       // 返回拍照的地址
  //       this.doUpload(imageData);
  //   }, (err) => {
  //       alert(err);
  //   });
  // }
  //   // 文件上传
  //   doUpload(src: any) {
  //     const fileTransfer: FileTransferObject = this.transfer.create();

  //     const options: FileUploadOptions = {
  //         fileKey: 'file',
  //         fileName: 'name.jpg',
  //         mimeType: 'image/jpeg',
  //         httpMethod: 'POST',
  //         params: { username : '张三', age : '20', height : '190' },
  //         headers: {}
  //     };

  //     const api = 'http://39.108.159.135/imgupload';

  //     fileTransfer.upload(src, encodeURI(api), options)
  //     .then((data) => {
  //         alert(JSON.stringify(data));
  //     }, (err) => {
  //         alert(JSON.stringify(err));
  //     });
  // }


}
