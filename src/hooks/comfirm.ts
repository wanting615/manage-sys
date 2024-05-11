import { ElMessageBox } from 'element-plus';
export const useComfirm = (tips: string, title?: string) => {
  return new Promise<void>((relsove, reject) => {
    ElMessageBox.confirm(tips, title || '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type: 'warning'
    })
      .then(() => {
        relsove();
      })
      .catch(() => {
        //取消
        reject && reject();
      });
  });
};
