import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount)
  private destroyRef = inject(DestroyRef);
  // constructor(){
  //   effect(()=>{
  //     console.log(`you click ${this.clickCount()} times`);
      
  //   })
  // }
ngOnInit(): void {
//   const subscription = interval(1000).pipe(
//     map((val)=>val*2))
//     .subscribe({
//     next:(value)=>console.log(value)
//   });
// this.destroyRef.onDestroy(()=>{
//   subscription.unsubscribe();
// })
const subscription = this.clickCount$.subscribe({
  // next: (val)=>console.log(`you click ${this.clickCount()} ${val} times`)
  next: (val)=>console.log(`you click ${val} times`)
})
this.destroyRef.onDestroy(()=>{
  subscription.unsubscribe()
})
}
onClick(){
  this.clickCount.update(prev=>prev+1)
}

}
