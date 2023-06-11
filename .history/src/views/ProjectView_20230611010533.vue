<template>
    <div style="display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: center;
        padding: 30px 90px;
        gap: 30px;
        position: relative;
        width: 100%;
        height: 507px;
        background: linear-gradient(180deg, #CEA8FF 0%, #3D008C 100%);
        flex: none;
        order: 3;
        flex-grow: 0;
        margin-top: -200px;
        top: 185px;">
        <div style="box-sizing: border-box;
            width: 340px;
            height: 340px;
            border: 3px solid #FFFFFF;
            border-radius: 30px;
            flex: none;
            order: 0;
            position: relative;
            left: -500px;
            top: 200px;
            flex-grow: 0;"><img style="width: 335px; height: 336px; border-radius: 25px; top: 0px; position: relative;" src="../assets/modeus.png" alt="">
        </div>
        <div style="display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 30px;
            gap: 30px;
            width: 600px;
            height: 357px;
            flex: none;
            order: 1;
            position: relative;
            left: -100px;
            top: -200px;
            flex-grow: 0;">
            <h1 style="width: 232px;
                height: 75px;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 600;
                font-size: 64px;
                line-height: 75px;
                display: flex;
                align-items: center;
                color: #FFFFFF;">Modeus</h1><br>
            <p id="p">Программа "Modeus" на языке Python - это отличный способ улучшить свою реакцию.</p><br>

            <p id="p1">С помощью этой программы вы можете тренировать свою реакцию в различных условиях и с тремя разными уровнями сложности.
            Modeus позволяет создавать разные наборы заданий, что делает каждую тренировку уникальной и интересной. </p><br>
            <div style="position: relative; top: -160px; left: 135px;"><router-link to="/profile"><img style="width: 70px; height: 70px; border-radius: 100%;" src="../assets/shadrin.png" alt=""><p style="position: relative; top: -60px; left: 90px; color: white; font-size: 16px;">Denis Shadrin</p></a></div>
            <div class="like" style="background: none; border: 2px solid white; font-size: 25px; padding: 30px 10px; width: 140px; left: 930px;"><img src="../assets/Serdtse.png" style="width: 40px; height: 40px;" alt="" class="pic2">0001</div>
            <a href="https://urfu.modeus.org/" class="link" style="position: relative; top: -370px; left: 700px;">Перейти</a>
        </div>
    </div>
    <div style="box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            gap: 10px;
            width: 840px;
            height: 231px;
            border: 3px solid #9747FF;
            border-radius: 30px;
            flex: none;
            order: 3;
            position: relative;
            top: 240px;
            flex-grow: 0;">
        <img src="../assets/modeus2.jpg" alt="" style="display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 10px;
            gap: 10px;
            width: 275px;
            height: 211px;
            flex: none;
            order: 0;
            position: relative;
            left: -190px;
            flex-grow: 0;">
        <img src="../assets/modeus3.jpg" alt="" style="display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10px;
            gap: 10px;
            width: 275px;
            height: 211px;
            flex: none;
            order: 1;
            position: relative;
            left: 200px;
            top: -210px;
            flex-grow: 0;">
    </div>
</template>

<script>
import { router } from 'websocket';


</script>

<style>

</style>