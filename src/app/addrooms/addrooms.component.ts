import {Component, OnInit, ViewChild, ElementRef, HostListener} from "@angular/core";
import { ListGuideService } from '../services/list-guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import { NumberService } from '../services/number.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addrooms',
  templateUrl: './addrooms.component.html',
  styleUrls: ['./addrooms.component.css']
})
export class AddroomsComponent implements OnInit {

  @ViewChild('imageloadCard') public imageloadCard: ElementRef;
  sError = '';
  loading = false;
  listFeatures = [];
  listBedstype = [];
  listTypeprice = [];
  listAddress = [];
  indexImg = 0;
  boolHotel = true;
  addroomsForm: FormGroup;

  constructor(private lg: ListGuideService, private ns: NumberService,
              private router: Router, private authService: AuthService) {
    this.addroomsForm  = new FormGroup({
      nameRoom: new FormControl(''),
      maxGuest: new FormControl(''),
      maxChild: new FormControl(''),
      numberSize: new FormControl(''),
      /* amountBed: new FormControl(''),
      typeBed: new FormControl(''), */
      description: new FormControl(''),
      inputAddress: new FormControl(''),
      inputNewAddress: new FormControl(''),
      inputTypeprice: new FormControl(''),
      priceWeekdays: new FormControl(''),
      priceWeekend: new FormControl('')
      // 'checkInstructuion': new FormControl('')
    });
  }

  ngOnInit(): void {

    const editor = this.authService.getEditorStorage();
    if (editor !== 1) {
       this.router.navigate(['/']);
    }

    this.loadBlanc();
  }


  loadBlanc() {
    this.lg.getGuideFeatures().subscribe( (value: any[]) => {
      this.listFeatures = value;
      // создаем элементы формы соответствующие массиву
      this.listFeatures.forEach( (feature, index, add) => {
        this.addroomsForm.addControl('typefeature' + feature.id, new FormControl(''));
      });

    });

    this.lg.getGuideBedstype().subscribe( (value: any[]) => {
      this.listBedstype = value;
      this.listBedstype.forEach( (bedstype, index, add) => {
        this.addroomsForm.addControl('bed' + bedstype.id, new FormControl(''));
      });

    });

    this.lg.getGuideTypeprice().subscribe( (value: any[]) => {
      this.listTypeprice = value;
    });

    this.lg.getGuideAddress(1).subscribe( (value: any[]) => {


      this.listAddress =  value.filter( a => {
        return Boolean(a.bHotel.data[0]);
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;} else {
          return 0;
        }
      });

    });

  }

  /* РАБОТА С ИЗОБРАЖЕНИЯМИ */

  clearFile() {
    if (this.indexImg === 0) {
      return;
    }
    this.deleteImgElemet(this.indexImg);
    this.indexImg = this.indexImg - 1;
  }

  deleteImgElemet(id) {
    const image = document.getElementById('img' + id.toString()) as HTMLImageElement;
    console.log('image.src', image.src);
    if (image !== undefined) {
      image.remove();
    } else {
      console.log('Image is undefined');
    }

  }

  onFileChange(fileInput)  {

    const elementFather = this.imageloadCard.nativeElement as HTMLElement;

    const files = fileInput.target.files;
    if (files.length === 0) {
      console.log('No files selected');
      return;
    }

for (let curFileIndex = 0; curFileIndex < files.length; curFileIndex++) { /* begin for */
    const reader = new FileReader();

    reader.onload = (event) => {
          console.log('curFileIndex=', curFileIndex);
          this.indexImg = this.indexImg + 1;
          const indexImg = this.indexImg;
          const img = new Image();
          img.id = 'img' + indexImg.toString();
          img.width = 250;
          let ext = '';
          const parts = files[0].name.split('.');
          if (parts.length > 1) {
            ext = parts.pop();
          }
          img.title = ext;
          // console.log(files[0].name, ext);
          // img.height = 200;
          img.onload = () => {
            elementFather.appendChild(img);
            // document.body.appendChild(img);
          };
          img.src = (event.target.result as string);
    };
    reader.readAsDataURL(files[curFileIndex]);
} /* end for */

  }


  saveRoom() {


    this.sError = '';
    let intAddress = -1;
    let sAddress = '';

    if (this.addroomsForm.controls.nameRoom.value === '') {
      this.sError = 'Введите название номера.';
      return;
    }

    if (!Number(this.addroomsForm.controls.maxGuest.value)) {
      this.sError = 'Добавьте количество гостей.';
      return;
    }

    if (!Number(this.addroomsForm.controls.maxChild.value) && this.addroomsForm.controls.maxChild.value !== '0') {
      this.sError = 'Добавьте количество детей.';
      return;
    }

    if (!Number(this.addroomsForm.controls.numberSize.value)) {
      this.sError = 'Добавьте размер номера.';
      return;
    }

/*
    if (!Number(this.addroomsForm.controls.amountBed.value)) {
      this.sError = 'Добавьте количество кроватей.';
      return;
    }

    if (!Number(this.addroomsForm.controls.typeBed.value)) {
      this.sError = 'Добавьте тип кровати.';
      return;
    }
*/



     if (this.boolHotel) {
       if (!Number(this.addroomsForm.controls.inputAddress.value)) {
         this.sError = 'Добавьте адрес.';
         return;
       }
       intAddress = Number(this.addroomsForm.controls.inputAddress.value);
     }

    if (!this.boolHotel) {
      if (this.addroomsForm.controls.inputNewAddress.value.toString().trim() === '') {
        this.sError = 'Добавьте адрес.';
        return;
      }
      sAddress = this.addroomsForm.controls.inputNewAddress.value.toString().trim();
    }




    if (!Number(this.addroomsForm.controls.inputTypeprice.value)) {
      this.sError = 'Добавьте тип расчета.';
      return;
    }

    if (!Number(this.addroomsForm.controls.priceWeekdays.value)) {
      this.sError = 'Добавьте стоимость в будний день.';
      return;
    }

    if (!Number(this.addroomsForm.controls.priceWeekend.value)) {
      this.sError = 'Добавьте стоимость в выходной день.';
      return;
    }


    const paramInsert = {
      name: this.addroomsForm.controls.nameRoom.value,
      guests: this.addroomsForm.controls.maxGuest.value,
      children: this.addroomsForm.controls.maxChild.value,
      size: this.addroomsForm.controls.numberSize.value,
      id_address: intAddress,
      sAddress,
      id_typeprice: this.addroomsForm.controls.inputTypeprice.value,
      price_weekdays: this.addroomsForm.controls.priceWeekdays.value,
      price_weekend: this.addroomsForm.controls.priceWeekend.value,
      description: this.addroomsForm.controls.description.value
    };

    // сохранение после проверок
    this.ns.insertNumber(paramInsert).subscribe(numberNewRecord => {

      if (numberNewRecord) {
          // tslint:disable-next-line: no-string-literal
          if (typeof numberNewRecord['insertId'] !== 'undefined') {
            // tslint:disable-next-line: no-string-literal
            const id = numberNewRecord['insertId'];

            // перебор особенностей номера и их вывод
            const masFeature = [];
            this.listFeatures.forEach( (feature, index, add) => {
                if (this.addroomsForm.controls['typefeature' + feature.id].value === true) {
                  masFeature.push(feature.id); }
            });

            if (masFeature.length > 0) {
                this.ns.insertNumberFeature({id_number: id, masFeature}).subscribe(value => {
                });
            }
           // закончили занесение особенностей номера


            // перебор кроватей и их вывод
            const masBedstype = [];
            this.listBedstype.forEach( (bed, index, add) => {
                     if (this.addroomsForm.controls['bed' + bed.id].value) {
                      const curval = this.addroomsForm.controls['bed' + bed.id].value;
                      if (Number(curval) && Number(curval) > 0) {
                        masBedstype.push({id_bed: bed.id, amount: curval }); }
                       }
                      });

            if (masBedstype.length > 0) {
              console.log(masBedstype);
              this.ns.insertNumberBedstype(id, masBedstype).subscribe(value => {
                       });
                    }
            // закончили занесение кроватей в базу

            // если есть фото сохраняем их
            if (this.indexImg > 0) {
              this.onPostImageAvatar(id);
            } else {

              setTimeout(() => {
                this.router.navigate(['/']);
              });

            }

           }
       }

      });

  }

  onPostImageAvatar(id: number) {

    this.loading = true;
    // tslint:disable-next-line:max-line-length

    for (let i = 1;  i <= this.indexImg; i++) {
      const image = document.getElementById('img' + i.toString()) as HTMLImageElement;
      if (image !== undefined) {
        this.ns.updateImageMessageTable(image.src, image.title, id, i).subscribe(() => {
          this.loading = false;
          if (i === this.indexImg) {
            this.clerAllImage(i);
            setTimeout(() => {
              this.router.navigate(['/']);
            });

          }

        });
      }
    }
  } // onPostImageAvatar() {

    clerAllImage(indexImage) {
      for (let i = 1;  i <= indexImage; i++) {
        this.deleteImgElemet(i);
      }
    }

  clickAddroomHotel() {
    this.boolHotel = !this.boolHotel;
  }


  onDrop(event) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer.files);
    // console.log('!!!!', event.dataTransfer.files);
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
