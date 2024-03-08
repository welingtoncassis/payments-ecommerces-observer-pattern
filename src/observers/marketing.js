export default class Marketing {
  /*
     its important to note that the update method is responsible
     of handling his errors/exceptions

     our subject will not have any await there
     our subject is the engine to send data to the observers
    */
  update({ id, userName }) {
    console.log(`[${id}]: Marketing: Sending email to ${userName}`);
  }
}
