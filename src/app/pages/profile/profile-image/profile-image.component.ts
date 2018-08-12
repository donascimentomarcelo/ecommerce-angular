import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile } from '../../../../../node_modules/ngx-file-drop';
import { ProfileService } from '../../../services/domain/profile.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private ngbActiveModal: NgbActiveModal){}

  ngOnInit() {
  }

 
  public files: UploadFile[] = [];
  public image: any;
  public imageName: string;
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          
          this.image = file;
          this.imageName = droppedFile.relativePath
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  send(){
    this.profileService.uploadImageProfile(this.image, this.imageName)
      .subscribe(response => {
        this.cancel();
      }, error => {
        this.cancel();
      });
  }

  cancel(){
    this.ngbActiveModal.dismiss(ProfileImageComponent);
  }

  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
