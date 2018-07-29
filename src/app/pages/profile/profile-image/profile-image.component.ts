import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile } from '../../../../../node_modules/ngx-file-drop';
import { ProfileService } from '../../../services/domain/profile.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  constructor(private profileService: ProfileService){}

  ngOnInit() {
  }

 
  public files: UploadFile[] = [];
  public image: any;
  public imageName: string;
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          
          this.image = file;
          this.imageName = droppedFile.relativePath
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  send(){
    console.log(this.image)
    this.profileService.uploadImageProfile(this.image, this.imageName)
      .subscribe(response => {
        console.log(response)
      }, error => {
        console.log(error)
      });
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
