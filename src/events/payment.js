export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard({ id, userName, age }) {
    console.log(`[${id}]: Payment made by ${userName}`);
    this.paymentSubject.notify({ id, userName });
  }
}
