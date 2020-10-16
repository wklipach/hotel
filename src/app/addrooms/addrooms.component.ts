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
      priceWeekend: new FormControl(''),
      priceWeek: new FormControl(''),
      priceMonth: new FormControl(''),
      priceChristmas: new FormControl(''),
      inputLinkVideo: new FormControl('')
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

console.log('11111111111111');

const elementFather = this.imageloadCard.nativeElement as HTMLElement;
let files = [];

console.log('222222222222222');

if (fileInput.target.files) {
      console.log('3333333333333');
      files = fileInput.target.files;
      if (files.length === 0) {
        console.log('No files selected');
        return;
      }
    }

if (fileInput.dataTransfer) {
      console.log('4444444444444');
      files = fileInput.dataTransfer.files;
    }


console.log('files=', files);
for (let curFileIndex = 0; curFileIndex < files.length; curFileIndex++) { /* begin for */
    const reader = new FileReader();

    const d = this.gragstart;

    reader.onload = (event) => {
          console.log('curFileIndex=', curFileIndex);
          this.indexImg = this.indexImg + 1;
          const indexImg = this.indexImg;
          const img = new Image();
          img.draggable = true;
          img.ondragstart = d;
          img.id = 'img' + indexImg.toString();
          img.width = 250;
          let ext = '';
          const parts = files[curFileIndex].name.split('.');
          // console.log('files[0]=', files[curFileIndex]);
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

///
    if (!Number(this.addroomsForm.controls.priceWeek.value)) {
      this.sError = 'Добавьте стоимость за месяц.';
      return;
    }

    if (!Number(this.addroomsForm.controls.priceMonth.value)) {
      this.sError = 'Добавьте стоимость за месяц.';
      return;
    }

    if (!Number(this.addroomsForm.controls.priceChristmas.value)) {
      this.sError = 'Добавьте стоимость в праздник.';
      return;
    }

    //priceWeek
    //priceMonth
    //priceChristmas
    //inputLinkVideo
///

    let sLinkVideo = '';
    if (this.addroomsForm.controls.inputLinkVideo.value) {
      sLinkVideo = this.addroomsForm.controls.inputLinkVideo.value.trim();
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
      description: this.addroomsForm.controls.description.value,
      price_week: this.addroomsForm.controls.priceWeek.value,
      price_month: this.addroomsForm.controls.priceMonth.value,
      price_christmas: this.addroomsForm.controls.priceChristmas.value,
      link_video:  sLinkVideo
    };

    // сохранение после проверок
    this.ns.insertNumber(paramInsert).subscribe(numberNewRecord => {

      console.log('numberNewRecord =', numberNewRecord);
      if (numberNewRecord) {
          // tslint:disable-next-line: no-string-literal
          if (typeof numberNewRecord['insertId'] !== 'undefined') {
            // tslint:disable-next-line: no-string-literal
            const id = numberNewRecord['insertId'];

            console.log('id =', id);

            // перебор особенностей номера и их вывод
            const masFeature = [];
            this.listFeatures.forEach( (feature, index, add) => {
                if (this.addroomsForm.controls['typefeature' + feature.id].value === true) {
                  masFeature.push(feature.id); }
            });

            console.log('this.listFeatures =', this.listFeatures);

            if (masFeature.length > 0) {
                this.ns.insertNumberFeature({id_number: id, masFeature}).subscribe(value => {
                });
            }
           // закончили занесение особенностей номера
            console.log('4444444');

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
    const data = event.dataTransfer.getData('text');
    // внешний источник файлов
    if (!data) {
    this.onFileChange(event);
    }

    // внутренний источник файлов
    if (data) {
      const elementFather = this.imageloadCard.nativeElement as HTMLElement;
     // const imageSourche = document.getElementById(data) as HTMLImageElement;
     // const imageTarget = event.target as HTMLImageElement;


    //  console.log('imageSourche', imageSourche);
     // console.log('imageTarget', imageTarget);

      // const sourceSrc = imageSourche.src;
      // const targetSrc = imageTarget.src;
      // const sourceTitle = imageSourche.title;
      // const targetTitle = imageTarget.title;
     // const idSourche = imageSourche.id;
     // const idTarget = imageTarget.id;

    //  console.log('idSourche=', idSourche);
    //  console.log('idTarget=', idTarget);

      //imageSourche.src = targetSrc;
      //imageSourche.title = targetTitle;
      //imageTarget.src = sourceSrc;
      //imageTarget.title = sourceTitle;
     // imageSourche.id = '-1'; // idTarget;
     // imageTarget.id = '-2'; // idSourche;
     // imageSourche.id =  idTarget;
     // imageTarget.id =  idSourche;

     // console.log('data', data, document.getElementById(data) );
      elementFather.appendChild(document.getElementById(data));

     const  list1 = elementFather.getElementsByTagName('img');
     for (let i=0; i<list1.length; i++) {
         list1[i].setAttribute('id', 'img'+(i+1).toString());
         console.log('list1[i].id=', list1[i].id);
    }

    }

  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  gragstart($event) {
    console.log('dragstart', $event);
    $event.dataTransfer.setData('text', $event.target.id);
  }

  clearLinkVideo() {
    this.addroomsForm.controls.inputLinkVideo.setValue('');
  }
}
