<template>
  <div class="bi-lift animated fadeIn">
    <draggable
      element="div"
      v-model="floors"
      :options="dragOptions"
      :move="onMove"
      @start="onStart"
      @end="onEnd"
    >
      <ul :style="{display: !switchStatus ? 'block' : 'none'}" >
        <li v-for="floor in floors"
            :key="floor.index"
            :class="{'on': floor.index == floor_selected}"
        >
          <a href="javascript:void(0);" @click="reachFloor(floor.index)">{{ floor.name }} </a>
        </li>
      </ul>
      <div class="go-header" @click="reachFloor(99)">
        回到顶部
      </div>
      <span class="switch" @click="switchStatus = !switchStatus"><i class="iconfont icon-back" v-if="switchStatus"></i><i class="iconfont icon-right" v-else></i></span>
    </draggable>

  </div>
</template>

<script type="text/ecmascript-6">
  import Draggable from 'vuedraggable'

  export default {
    name: 'Lift',
    props: {
      panels: {
        type: Array,
        required: true
      },
      scroll_selected: {
        type: Number
      }
    },
    data() {
      return {
        floors: this.panels,
        floor_selected: 0,
        editable:true,
        isDragging: false,
        delayedDragging:false,
        switchStatus:true
      }
    },
    computed: {
      dragOptions () {
        return  {
          animation: 1,
          group: 'lift',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      },
    },
    watch: {
      scroll_selected: function() {
        this.floor_selected = this.scroll_selected
      },
      panels() {
        this.floors = this.panels;
      },
      floors: function() {
        this.$emit('updatePanels', this.floors)
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        if (!relatedElement || !draggedElement) {
          return false;
        }
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      onStart ({oldIndex, newIndex}) {
        this.isDragging = true;
      },
      onEnd ({oldIndex, newIndex}) {
        this.isDragging = false;
        if (!this.floors[oldIndex] || !this.floors[newIndex]) {
          return;
        }
        var draggedIndex = this.floors[oldIndex].index;
        var relatedIndex = this.floors[newIndex].index;
        if (relatedIndex == this.floor_selected) {
          this.reachFloor(draggedIndex);
        } else if (draggedIndex == this.floor_selected) {
          this.reachFloor(relatedIndex);
        }
      },
      reachFloor(index) {
        if (index == 99) {
          this.$emit('reachFloor', -1);
        } else {
          this.floor_selected = index;
          this.$emit('reachFloor', index);
        }
      },
    },
    components: {
      Draggable,
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .bi-lift {
    border-radius: 1px;
    position: fixed;
    bottom:30px;
    right: 2px;
    z-index: 2;
    border: 1px solid #f7f7f7;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0 5px rgba(186, 204, 207, 0.7);
    box-shadow: 0 0 5px rgba(186, 204, 207, 0.7);
    filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=0, Color='rgba(186, 204, 207, 0.7)');
    -ms-filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=0, Color='rgba(186, 204, 207, 0.7)')";
    ul{
      border-bottom: 0;
      overflow: auto;
    }
    li {
      background: #fff;
      a {
        padding: 5px 10px;
        display: block;
        color: #666;
        height: 30px;
        font-size: 12px;
        border-radius: 1px;
        text-align: center;
      }
    }
    a:hover{color: #339ace}
    .default{
      width: auto; overflow: hidden;
    }
    .go-header{
      display: block;
      width: 92px;
      padding: 5px 5px 5px 16px;
      text-align: center;
      background-color: #ececec;
      &:hover{
        background-color: #339ace;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .bi-lift li.on a {
    color: #0080c1;
  }
  i{
  }
  .switch{
    display: block;
    width: 16px;
    height: 31px;
    position: absolute;
    bottom:0;
    left:0;
    color: #666;
    background-color: #dcdfe6;
    line-height: 31px;
    text-align: center;
    cursor: pointer;
  }
</style>
