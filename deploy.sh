#!/bin/bash
# ============================================================
# lineFresh 部署腳本
# 用法: ./deploy.sh <SSH_USER> <VM_IP>
# 範例: ./deploy.sh weihong 34.xxx.xxx.xxx
# ============================================================

set -e

SSH_USER=${1:-"weihong"}
VM_IP=${2:-"YOUR_VM_IP"}
REMOTE_DIR="/var/www/lineFresh"

echo "🚀 開始部署 lineFresh 到 weihongweb.com/LineFresh"
echo "   目標: ${SSH_USER}@${VM_IP}:${REMOTE_DIR}"
echo ""

# 1. Build 前端
echo "📦 Building frontend..."
cd "$(dirname "$0")/frontend"
pnpm build
echo "✅ Build 完成"
echo ""

# 2. 在 VM 上建立目錄
echo "📁 建立遠端目錄..."
ssh ${SSH_USER}@${VM_IP} "sudo mkdir -p ${REMOTE_DIR} && sudo chown ${SSH_USER}:${SSH_USER} ${REMOTE_DIR}"

# 3. 上傳 dist/ 到 VM
echo "📤 上傳檔案到 VM..."
scp -r dist/* ${SSH_USER}@${VM_IP}:${REMOTE_DIR}/
echo "✅ 上傳完成"
echo ""

# 4. 設定 Nginx（首次部署需要）
echo "⚙️  檢查 Nginx 設定..."
ssh ${SSH_USER}@${VM_IP} "
  if [ ! -f /etc/nginx/sites-available/lineFresh ]; then
    echo '  首次部署，請手動加入 Nginx 設定（詳見 nginx-lineFresh.conf）'
  else
    echo '  Nginx 設定已存在，重新載入...'
    sudo nginx -t && sudo systemctl reload nginx
  fi
"

echo ""
echo "🎉 部署完成！"
echo "   請訪問: http://weihongweb.com/LineFresh"
