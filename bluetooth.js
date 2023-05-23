const element = document.getElementById("bluetooth");

element.addEventListener("click", function() {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['device_information'] }] })
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    console.log('Getting Device Information Service...');
    return server.getPrimaryService('device_information');
  })
  .then(service => {
    console.log('Getting Characteristics...');
    return service.getCharacteristics();
  })
  .then(characteristics => {
    console.log('Reading Characteristics...');
    let queue = Promise.resolve();
    characteristics.forEach(characteristic => {
      queue = queue.then(_ => characteristic.readValue().then(value => {
        console.log(`${characteristic.uuid}: ${value.getUint8(0)}`);
      }));
    });
    return queue;
  })
  .catch(error => { console.error(error); });
});

