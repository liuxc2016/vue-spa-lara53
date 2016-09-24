<template>
    
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Bar Component</div>

                <div class="panel-body">
                    {{message}}
                </div>
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