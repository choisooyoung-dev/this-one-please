# 2거주세요 프로젝트

이 프로젝트는 음식 배달 서비스를 구현한 프로젝트입니다. 사용자는 고객이나 사장님으로 계정을 생성하고 서비스를 이용할 수 있습니다.

# 음식 배달 서비스 프로젝트

## ✨ 배포 링크

-   [this-one-please](https://port-0-this-one-please-hkty2alqa1mr7f.sel4.cloudtype.app/) <!-- 배포 링크 추가 -->

## 👋 2거주세요 팀 소개

-   **2거주세요**는 고객들에게 편리하고 안전한 음식 배달 서비스를 제공하는 플랫폼입니다.

## 👨‍💻 팀원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/choisooyoung-dev"><img src="https://avatars.githubusercontent.com/u/108859974?v=4" width="100px;" alt=""/><br /><sub><b> 팀장 : 최수영 </b></sub></a><br /></td>
      <td align="center"><a href=https://github.com/dainK"><img src="https://avatars.githubusercontent.com/u/26786677?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 강다형 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/nemo4"><img src="https://avatars.githubusercontent.com/u/25000762?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 고병옥 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/jeongseon0"><img src="https://avatars.githubusercontent.com/u/86090167?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 신정선 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/choiyensik"><img src="https://avatars.githubusercontent.com/u/146906054?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 최연식 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 👥 팀 구성원 및 역할

-   **팀장: 최수영**

-   **최연식**

    -   장바구니 기능 구현
    -   리뷰/평점 기능 구현
    -   전체 프론트엔드 담당

-   **강다형**

    -   프론트엔드 디자인 구현
    -   데이터베이스 및 ERD 설계
    -   전체 프론트엔드 담당

-   **신정선**

    -   스토어 정보 관리 기능 구현
    -   메뉴 정보 관리 기능 구현
    -   전체 백엔드 담당

-   **최수영**

    -   회원 관리 기능 구현
    -   회원 인증 기능 구현
    -   전체 백엔드 담당

-   **고병옥**
    -   와이어프레임 디자인
    -   전체 디자인 담당

## ✅ 기술 스택

<!-- 프로젝트에 사용된 기술 스택을 나열 -->

-   ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
-   ![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
-   ![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
-   ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
-   ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## ✅ 주요 기능

-   **로그인 및 회원가입**

    -   사용자는 “고객님” 혹은 “사장님”으로 계정을 생성하고 로그인 할 수 있어야 합니다.
    -   회원가입 시 이메일 인증 기능을 넣어주세요.
    -   이 때, “고객님”으로 가입 시 100만 포인트를 지급해주세요.
        -   포인트 → 메뉴 주문시 사용되는 사이버 화폐입니다.

-   **“사장님” - 업장 CRUD 기능**

    -   “사장님”은 업장 정보를 등록 및 수정, 삭제를 할 수 있어야 합니다.
    -   “사장님”은 업장 정보를 오직 1개만 갖고 있을 수 있어야 합니다.
    -   업장 정보 목록은 모두가 볼 수 있어야 합니다.

-   **“사장님” - 메뉴 CRUD 기능**

    -   “사장님”은 메뉴 정보를 등록 및 수정, 삭제를 할 수 있어야 합니다.
    -   메뉴 정보는 다음과 같습니다.
        -   이미지
        -   메뉴 이름
        -   가격
    -   업장 내에서 동일한 메뉴 이름으로는 재등록이 되지 않습니다.
    -   메뉴 목록은 모두가 볼 수 있어야 합니다.

-   **음식점 검색 기능**

    -   “사장님” 및 “고객님”은 키워드 기반으로 음식점을 검색하여 볼 수 있어야 합니다.

-   **“고객님” - 메뉴 주문 기능**

    -   “고객님”은 메뉴를 주문할 수 있어야 합니다.
    -   단, 잔여 포인트가 메뉴 가격보다 비싸면 주문을 할 수 없어야 합니다.
    -   주문 시 포인트 차감을 할 때는 반드시 트랜잭션을 이용해주세요.

-   **“사장님” - 주문 확인 기능**

    -   “사장님”은 “고객님”들이 주문한 배달 메뉴를 확인할 수 있어야 합니다.

-   **“사장님” - 배달 완료 기능**

    -   “사장님”은 “고객님”들이 주문한 배달 메뉴들 중 하나를 선택하여 배달 완료가 되었다고 상태를 변경할 수 있습니다.
        -   배달 상황까지 일일이 컨트롤 하는 것은 난이도가 다소 높을 수 있기에 간단하게 구현하도록 합니다.
    -   이렇게 상태가 변경이 되면 주문한 메뉴의 가격만큼 사장님의 잔고에 포인트로 입금이 되어야 합니다.

-   **“고객님” - 리뷰 및 평점 관련 CRUD 기능**
    -   사용자는 음식점에 대한 리뷰를 작성하고, 평점을 남길 수 있어야 합니다.
