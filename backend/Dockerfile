# 베이스 이미지 설정
FROM node:20

# 작업 디렉토리 생성
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "start:prod"]