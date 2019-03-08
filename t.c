#include "io430.h"
void dulieu1();
void dulieu0();
void xungclock();
void xungchot();
void hieuung1();
void hieuung2();
void hieuung3();
void hieuung4();


void main( void ){ // Viết thành void main()
 
  // Stop watchdog timer to prevent time out reset
    WDTCTL = WDTPW + WDTHOLD;
    P1DIR |=(BIT0+BIT1+BIT2+BIT3);
    P1OUT |=BIT3;
  
    while(1){ //Có thể viêt thành while(true) cho dễ hiểu 
        hieuung1();
        hieuung1();
        hieuung2();
        hieuung3();
        hieuung4();
    }
}

void dulieu1(){

  P1OUT |=BIT1;

}
void dulieu0(){

  P1OUT &= ~BIT1;

}


void xungclock(){

    P1OUT |=BIT0;
    __delay_cycles(5000);
    P1OUT &= ~BIT0;
    __delay_cycles(5000);
}

void xungchot(){

  P1OUT |=BIT2;
  __delay_cycles(5000);
  P1OUT &= ~BIT2;
  __delay_cycles(5000);

}
  

//hieu ung 1: led chay tu 1 den 32
void hieuung1(){
    for(int i=0;i<=32;i++){    
        dulieu1();
        xungclock();
        xungchot();
    }
}
//hieu ung 2 led sang chan
void hieuung2(){
    for(int i=0;i<=32;i++)
    {
        if(i%2=0){//Du một dấu ngoặc )
    
            dulieu1();
            xungclock();
            xungchot();
    
        }else{  //Else không cần ngoặc 
    
            dulieu0();
            xungclock();
            xungchot();
        }
  }
}
  //hieu ung 3 led tat het
void hieuung3(){
    for(int i=0;i<=32;i++){
        dulieu1();
        xungclock();
        xungchot();
    }
}
//hieuung4 led sang het 32 led
void hieuung4(){
    for(int i=0;i<=32;i++){
        dulieu1();
        xungclock();
    }
    xungchot();
}