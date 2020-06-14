<template>
    <div id="app">
        <div class="Empty">
            <img :src="Empty" alt="Empty">
            <div class="Others">
                <div class="Airpod" v-if="items[0].selected">
                    <img :src="Airpod" alt="Airpod">
                </div>
                <div class="iMac" v-if="items[1].selected">
                    <img :src="iMac" alt="iMac">
                </div>
                <div class="iPad" v-if="items[2].selected">
                    <img :src="iPad" alt="iPad">
                </div>
                <div class="iPhone" v-if="items[3].selected">
                    <img :src="iPhone" alt="iPhone">
                </div>
                <div class="Macbook" v-if="items[4].selected">
                    <img :src="Macbook" alt="Macbook">
                </div>
                <div class="MacPro" v-if="items[5].selected">
                    <img :src="MacPro" alt="MacPro">
                </div>
                <div class="Watch" v-if="items[6].selected">
                    <img :src="Watch" alt="Watch">
                </div>
            </div>
        </div>
        <body class="jumbotron Price">
            <h2>{{minPrice}} ~ {{maxPrice}}￦</h2>
            <h2>옵션까지 한다면? {{fullOptPrice}}￦</h2>
        </body>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            Empty: require('../assets/Empty.jpg'),
            Airpod: require('../assets/Airpod.jpg'),
            iMac: require('../assets/iMac.jpg'),
            iPad: require('../assets/iPad.jpg'),
            iPhone: require('../assets/iPhone.jpg'),
            Macbook: require('../assets/Macbook.jpg'),
            MacPro: require('../assets/MacPro.jpg'),
            Watch: require('../assets/Watch.jpg'),
            items: [],
            minPrice: 0,
            maxPrice: 0,
            fullOptPrice: 0,
            minPrices: [199000, 1440000, 499000, 550000, 1320000, 7899000, 259000],
            maxPrices: [329000, 6300000, 1299000, 1550000, 3690000, 8599000, 539000],
            optionPrices: [329000, 19737000, 2703000, 2299000, 8763000, 73376000, 1679000],
        }
    },
    async mounted() {
        this.items = await this.$store.dispatch('favorite/getItems').then(
            (favorites) => { 
                return favorites
            },
            () => {
                return this.$store.state.favorite
            }
        )
        for (var idx in this.items) {
            if (this.items[idx].selected) {
                this.minPrice += this.minPrices[idx]
                this.maxPrice += this.maxPrices[idx]
                this.fullOptPrice += this.optionPrices[idx];
            }
        }
        this.minPrice = this.minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.maxPrice = this.maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.fullOptPrice = this.fullOptPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
}
</script>
<style scoped>
    img {
        max-width: 100%;
        width: auto;
        height: auto;
        overflow: hidden;
    }
    .Airpod:hover {
        opacity: 1; 
        z-index:10;
    }
    .iMac:hover {
        opacity: 1; 
        z-index:10;
    }
    .iPad:hover {
        opacity: 1; 
        z-index:10;
    }
    .iPhone:hover {
        opacity: 1; 
        z-index:10;
    }
    .Macbook:hover {
        opacity: 1; 
        z-index:10;
    }
    .MacPro:hover {
        opacity: 1;
        z-index:10; 
    }
    .Watch:hover {
        opacity: 1; 
        z-index:10;
    }
    .Empty {
        position: relative;
        top: 0px;
    }
    .Airpod {
        opacity: 0.7;
        z-index:5;
        position: absolute;
        width: 7%;
        top: 75%;
        left: 50%;
        right: -50%;
    }
    .iMac {
        opacity: 0.7;
        z-index: 2;
        position: absolute;
        width: 40%;
        top: 30%;
        right: -29%;
        left: 29%;
    }
    .iPad {
        opacity: 0.7;
        z-index: 3;
        position: absolute;
        width: 25%;
        top: 49%;
        right: -71%;
        left: 71%;
    }
    .iPhone {
        opacity: 0.7;
        z-index: 3;
        position: absolute;
        width: 8%;
        top: 67%;
        left: 37%;
        right: -37%;
    }
    .Macbook {
        opacity: 0.7;
        z-index: 2;
        position: absolute;
        width: 25%;
        top: 50%;
        left: 9.5%;
        right: -9.5%;
    }
    .MacPro {
        opacity: 0.7;
        z-index: 4;
        position: absolute;
        width: 15%;
        top: 35%;
        left: 70%;
        right: -70%;
    }
    .Watch {
        opacity: 0.7;
        position: absolute;
        width: 10%;
        top: 70%;
        left: 60%;
        right: -60%;
    }
    .Price {
        position: relative;
        text-align: center;
        font-family: system-ui;
    }
</style>