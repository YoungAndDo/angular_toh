import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    console.log(value, args);

    // 환율변환 pipe
    // let result: number = 0;
    // switch (args) {
    //   case '$':
    //     result = (value as number) / 1100;
    //     break;
    //   case 'yen':
    //     result = (value as number) / 120;
    //     break;
    // }
    //
    // return result;

    return (value as string).substring(0, 16);
  }
}
