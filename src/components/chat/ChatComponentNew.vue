<template>

    <div id="wrapper">
        <div id="grid">
            <div class="menu"> 
                <h1>Hello</h1>
                <ChatProfile profile="{{}}" lastMessage="{{}}"></ChatProfile>
            </div>
        </div>
    </div>
</template>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        background-color: #696969;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .menu { 
        grid-area: 1 / 1 / 6 / 2;
        width: 100%;
        display: block;
        overflow: auto;
    }
    .div3 { grid-area: 1 / 2 / 6 / 6; }

</style>