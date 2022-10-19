<template>
  <div>
    <!-- 此处代码会影响样式，若没有 el-tooltip， 则el-popover effect="dark" 样式正常 -->
    <el-tooltip effect="light" content="白色背景hover" placement="bottom">
      <el-button>白色背景click</el-button>
    </el-tooltip>
    <!-- 此处代码注释后 -->

    <el-popover effect="dark" trigger="click">
      <template #reference>
        <el-button>黑色背景click</el-button>
      </template>
      <div>黑色背景</div>
    </el-popover>

    <el-popover :width="200" effect="dark" trigger="hover">
      <template #reference>
        <el-button>黑色背景hover</el-button>
      </template>
      <div>黑色背景</div>
    </el-popover>
  </div>
</template>
