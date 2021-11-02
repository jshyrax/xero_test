class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class StandardItem extends Item{
  constructor(name, sellIn, quality){
    super(name, sellIn, quality);

  }
  updateItem(){
    this.quality -= this.quality <= 0 ? 0 : (this.sellIn > 0 ? 1 : 2);
  }
}

class LegendaryItem extends Item{
  constructor(name, sellIn, quality){
    super(name, sellIn, quality);

  }
  updateItem(){}
}

class AgedItem extends Item{
  constructor(name, sellIn, quality){
    super(name, sellIn, quality);
  }
  updateItem(){
    this.quality++;
  }
}

class TicketItem extends Item{
  constructor(name, sellIn, quality){
    super(name, sellIn, quality);
  }
  updateItem(){
    // if less than 10 days quality +2, less 5 days quality +3
    if (this.sellIn < 11){
      this.quality += 2;
    }else if (this.sellIn < 6){
      this.quality += 3;
    }else if (this.sellIn <= 0){
      this.quality = 0;
    }
  }
}



class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {


      //Quality logic
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // legendary and standard

        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //legendary item
            //this.items[i].quality = this.items[i].quality - 1; //standard
            let _standardItem = new StandardItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
            _standardItem.updateItem();  
            this.items[i].quality = _standardItem.quality;         
          }

        }

      } else {

        //aged & tickets
        if (this.items[i].quality < 50) {

          

          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // if less than 10 days quality +2, less 5 days quality +3
            
            let _ticketItem = new TicketItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
            _ticketItem.updateItem()
            this.items[i].quality = _ticketItem.quality;

            // if (this.items[i].sellIn < 11) {
            //   if (this.items[i].quality < 50) {
            //     this.items[i].quality = this.items[i].quality + 1;
            //   }
            // }
            // if (this.items[i].sellIn < 6) {
            //   if (this.items[i].quality < 50) {
            //     this.items[i].quality = this.items[i].quality + 1;
            //   }
            // }
          }else{
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }

      // SellIn logic
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }


      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') { //not aged
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') { //not tickets

            //standard & legendary
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {

                let _standardItem = new StandardItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
                _standardItem.updateItem();

                this.items[i].quality = _standardItem.quality;
                //this.items[i].quality = this.items[i].quality - 1;
              }
            }

          } else {
            //tickets
            let _ticketItem = new TicketItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
            _ticketItem.updateItem();
            this.items[i].quality = _ticketItem.quality;
            // this.items[i].quality = this.items[i].quality - this.items[i].quality; //0

          }
        } else {

          if (this.items[i].quality < 50) {
            //aged
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
