$(document).ready(function () {



  

    function Content(image, single, productId, sku, description) {
        var cur = this;
        this.image = ko.observable(image),
            this.single = ko.observable(single),
            this.productId = ko.observable(productId),
            this.sku = ko.observable(sku);
        this.input = ko.observable(10);
        this.description = ko.observable(description);
        this.multiple = ko.computed(
            function () {
                return (Number(cur.input()) * Number(cur.single())).toFixed(2);
            }
        )
    };
    var loader = function () {
        this.rateOption = [{
                text: "0.00$ - 0.25$",
                id: '1'
            },
            {
                text: "0.25$ - 0.50$",
                id: '2'
            },
            {
                text: "0.50$ - 0.75$",
                id: '3'
            },
            {
                text: "0.75$ - 1.00$",
                id: '4'
            }
        ];
        this.sortOption = [{
            text: "Price Low - High",
            id: '1'
        }, {
            text: "Price high - Low",
            id: '2'
        }];
        this.plus = function (product) {
            product.input(Number(product.input()) + 1);
        }
        this.minus = function (product) {
            product.input(Number(product.input()) - 1);
        }


        this.first = ko.observable();
        this.second = ko.observable();

        this.load = ko.observableArray([

            "1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg"


        ])

        this.all2 = ko.observableArray([]);
        var self = this;
        this.all1 = ko.observableArray([]);
        this.imageContent = [


            "1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg",
            "6.jpg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg"

        ];
        this.Bass = function () {
           
            self.all1(self.all2());
            this.Pricesort = function ()

            {
                var selectedVal = self.first();
                
                if (!selectedVal) {
                       //console.log("inside if");
                    return ;
                }

                return self.all1().filter(function (f) {
                    if (selectedVal == 1) {
                       
                        return f.single() >= 0.00 && f.single() < 0.25;
                    } else if (selectedVal == 2) {
                        return f.single() >= 0.25 && f.single() < 0.50;
                    } else if (selectedVal == 3) {
                        return f.single() >= 0.50 && f.single() < 0.75;
                    } else if(selectedVal==4){
                        return f.single() >= 0.75 && f.single() < 1.00;
                    }

                });
            }
     
            if((typeof self.Pricesort()=="undefined")){
                
                console.log("undefined");
                

                return
            
            };
            self.all1(self.Pricesort());
            self.pageNumber(0);

        }

        this.singleValue = [0.10, 0.25, 0.32, 0.43, 0.55, 0.66, 0.79, 0.86, 0.93, 1.00];
        this.description = [
            "OnePlus 9R specifications include a Snapdragon 870 SoC paired with 8GB of RAM and Adreno 650 GPU, it has 128GB of UFS 3.1 storage, and the phone offers a 48-Megapixel camera with dual-LED flash",
            "OnePlus 9R comes fitted with a 6.5-inch fluid AMOLED display with HDR10+ support. It offers a full HD+ screen with a resolution of 1080x2400px alongside 402PPI",
            "The phone carries a 48MP quad-rear camera with dual-tone LED flash. A 48MP main camera lives with a 123˚ view 16MP ultra-wide lens, a 5MP macro camera, and a 2MP Monochrome sensor with autofocus",
            " As far as the selfies are concerned, the phone offers a 16MP punch-hole camera with screen flash. Besides, you can record UHD 4K videos @30fps using its main rear camera",
            "OnePlus 9R is driven by a 5G-ready Snapdragon 870 octa-core processor integrated on a 7nm chipset. The phone runs on Android 10 operating software based on Oxygen OS11 UI on top",
            "The phone gets juice from a 4,500mAh Li-Po battery and supports 65W fast charging out of the box. The battery attains 1-100% in just 39-minutes, claims OnePlus. With its fast charge feature, heavy users and gamers won’t have to wait for too long to get back into the screen.",
            "OnePlus 9R comes with 128GB of UFS 3.1 storage that increases app/games response time. Plus, you get ample storage for keeping your photos, videos, songs, and important files",
            "It brings a 6.5-inch Fluid AMOLED display with a 16MP punch hole camera, an in-display fingerprint sensor, and is backed by a 4,500mAh battery with a 65W fast charger. Here are the OnePlus 9R specs and features that you must read before making any buying decision.",
            ". As far as the selfies are concerned, the phone offers a 16MP punch-hole camera with screen flash. Besides, you can record UHD 4K videos @30fps using its main rear camera."

        ]
        this.all = ko.observableArray(["1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg"
        ]);
        this.pageNumber = ko.observable(0);
        this.nbPerPage = 10;
        this.totalPages = ko.computed(function () {
            var div = Math.floor(self.all1().length / self.nbPerPage);
            div += self.all1().length % self.nbPerPage > 0 ? 1 : 0;
            return div - 1;
        });


        this.sort = function () {
            self.all1(self.all2());
            if (self.second() == 1) {
                function compare(a, b) {
                    if (a.single() < b.single()) {
                        return -1;
                    }
                    if (a.single() > b.single()) {
                        return 1;
                    }
                    return 0;
                }

                self.all1.sort(compare);
            } else if(self.second()==2){
                function compare(a, b) {
                    if (a.single() > b.single()) {
                        return -1;
                    }
                    if (a.single() < b.single()) {
                        return 1;
                    }
                    return 0;
                }

                self.all1.sort(compare);
            }

         

        }
        this.show = function () {
            console.log("hi");
        }
        this.printPage = function () {
            return this.pageNumber() + 1;
        }
        this.paginated = ko.computed(function () {
            var first = self.pageNumber() * self.nbPerPage;
            return self.all1.slice(first, first + self.nbPerPage);
        });
        this.hasPrevious = ko.computed(function () {
            return self.pageNumber() !== 0;
        });
        this.hasNext = ko.computed(function () {
            return self.pageNumber() !== self.totalPages();
        });
        this.next = function () {
            if (self.pageNumber() < self.totalPages()) {
                self.pageNumber(self.pageNumber() + 1);
            }
        }

        this.previous = function () {
            if (self.pageNumber() != 0) {
                self.pageNumber(self.pageNumber() - 1);
            }
        }
        
        this.editor = new Content(),
            this.editor.image("1.jpeg");
        this.editItem = function (item) {
            console.log(item.image());
            self.editor.image(item.image());
            self.editor.single(item.single());
            self.editor.productId(item.productId());
            self.editor.sku(item.sku());
            self.editor.input(item.input());
            self.editor.description(item.description());
            self.editor.multiple = item.multiple();

            $('#editDisplay').dialog({
                modal: true,

                minHeight: 300,
                minWidth: 700,


            });


        }
        this.giveRand = function () {
            return Math.floor(Math.random() * 10);
        }
        this.skuRand = function () {
            return Math.floor(1000 + Math.random() * 9000);
        }
        this.load = function () {

            for (let i = 0; i < 100; i++) {
                var image = self.imageContent[self.giveRand()];
                var single = self.singleValue[self.giveRand()];
                var productId = i + 1;
                var sku = self.skuRand();
                var description = self.description[self.giveRand()];
                self.all1.push(new Content(image, single, productId, sku, description));
            }
            self.all2(self.all1());


        }

        this.load();

    }

    ko.applyBindings(new loader())
})