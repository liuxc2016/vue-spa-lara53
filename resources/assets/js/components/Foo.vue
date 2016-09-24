<template>
    
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Foo Component</div>

                <div class="panel-body">
                    {{message}}
                </div>
                <slot>
                    父组件的插槽
                </slot>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data: function(){
            return {
                message: 'hello its from data'
            }
        }
    }
</script>