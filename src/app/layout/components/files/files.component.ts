import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../../services/upload.service';

@Component({
  standalone: true,
  selector: 'app-files',
  imports: [CommonModule, MatIconModule],  
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  uploadService = inject(UploadService)
  
  files: any[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    // private modalService: NgbModal,
    // private firestore: Firestore,
    ) {
  }

  ngOnInit() {
    this.createItems();
  }

  dismissModal() {
    this.activeModal.dismiss('dismiss');
  }

  closeModal() {
    this.activeModal.close();
  }

  createItems() {
  this.files = [
    {
      name: 'Archivo 1',
      description: 'archivo1.pdf'
    },
    {
      name: 'Archivo 2',
      description: 'ejemplo.csv'
    }
  ]
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
      this.uploadService.uploadFile(file).subscribe({
        next: (res) => console.log('✅ Subida exitosa:', res),
        error: (err) => console.error('❌ Error al subir:', err),
      });
    }
  }
}
