<template>
    <div id="app">
        <div class="Empty">
            
            <img :src="Empty" alt="Empty">
            <div class="Others">
                <div class="Airpod">
                    <img :src="Airpod" alt="Airpod">
                </div>
                <div class="iMac">
                    <img :src="iMac" alt="iMac">
                </div>
                <div class="iPad">
                    <img :src="iPad" alt="iPad">
                </div>
                <div class="iPhone">
                    <img :src="iPhone" alt="iPhone">
                </div>
                <div class="Macbook">
                    <img :src="Macbook" alt="Macbook">
                </div>
                <div class="MacPro">
                    <img :src="MacPro" alt="MacPro">
                </div>
                <div class="Watch">
                    <img :src="Watch" alt="Watch">
                </div>
            </div>
        </div>
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
        }
    },
    async created() {
        this.items = await this.$store.dispatch('favorite/getItems').then(
            (favorites) => { 
                return favorites
            },
            error => {
                this.favoriteLoading = false
                this.favoriteMessage = error.message
            }
        )
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
        top: 48%;
        right: -70.5%;
        left: 70.5%;
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

</style>