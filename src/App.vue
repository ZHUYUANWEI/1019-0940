<template>
  <div>
    <el-tooltip effect="light" content="白色背景hover" placement="bottom">
      <el-button>白色背景click</el-button>
    </el-tooltip>

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
