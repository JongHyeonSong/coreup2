# coreup 프로젝트(35.232.243.209)

코로나로 고통받는 각국의 사람들이 서로 응원의 메세지를 공유 할 수 있는 웹 사이트로 corana + cheerup를 엮어서 이름지었습니다

>> Frontend - React / react-chart, react-router-dom  
Backend - django / django_restframework   
design - bootstrap4  
bundle - webpack  
deploy - Nginx-gunicorn-django  
hosting - GCP VM

## 필요기능
- 접속자는 실시간으로 전세계 각국의 현재 corona감염상태를 시각화된 그래프로 볼수있다
- 사용자는 셀렉트 옵션을 통해 각 국가마다 남겨진 응원의 메세지를 볼수있다
- 사용자가 로그인 했다면 추가적인 "create", "update", "delete"가 가능하다
- 응원의 메세지에 본인이 원하는 이미지를 담아서 업로드 할수있다
- 각 응원 메세지마다 '좋아요', '싫어요'를 지정할수있다


## Backend

- comment 정보  
장고와 장고 restframework를 이용해 ModelViewSet을 상속받아 구현 후  프론트에서 원하는 정보를 가져가게 했습니다
<img width="100%" alt="대시보드" src="readmeImg\comment_drf.png">
각 comment는 사용자에 외부키가 묶여져 있고 그 사용자의 이름을 알아내기 위해서 처음에 serializer에 serializer를 또 묶어서 한단계 더 깊은 DRF를 구현하려 했으나 serailizer를 저장할때 일반적으로 form처럼 외부키 추가를 시도했으나 실패하고 이후에 다른 방법들을 찾아봤지만 성공하지 못했고 새로운 SerializerMethodField를 "comment_username" 이라는 변수명으로 추가해서 사용했습니다

- 유저 정보
<img width="100%" alt="대시보드" src="readmeImg\user_drf.png">
로그인 인증 방식은 장고 session기능을 그대로 사용했으며 프론트에서 화면이 랜더링 될때 request.user의 pk를 이용해 위의 DRF로 데이터 요청을 보내고 React의 state에 유저 정보를 저장하게 했습니다  
 
- 로그인/로그아웃/회원가입/프로필 
장고에서 제공하는 UserCreationForm, login, logout을 사용해서 만들었습니다. 기존유저 확장을 위해 UserProfile이라는 새로운 모델과 User를 1:1매칭하여 사용했습니다.  
이 과정에서 주소 전환이 일어나는데 로그인 방식을 폼으로 처리하지않고 react에서 모달창과 AJAX를 이용해서 로그인하거나 새로운 JWT를 공부해서 로그인 방법을 개선할 예정입니다

## Frontend

React를 이용해서 구현했고 webpack으로 빌드했고 상태관리는 useContext/useReducer 훅을 사용 했습니다.  
두가지 메인 화면이 있는데 하나는 실시간으로 외부 코로나API를 가져와서 차트를 그리는 Chart와, 또하나는 장고백엔드에서 처리하는 Comment 컴포넌트입니다. 둘을 React의 Route기능을 이용해서 화면 전환을 하는듯한 사용자 경험을 주었습니다

- Chart 
<img width="100%" alt="대시보드" src="readmeImg\chart_global.png">
default로 나오는 전체 global 차트로 현재 날짜로 업데이트된 감염자/회복자/사망자 수를 나타냅니다 react-count를 이용해서 count가 동적으로 올라가게 했습니다  
그리고 아래는 react-chart를 이용해서 corona api에서 daily데이터를 받아와서 시간에 따른 변화 양상을 그려줍니다.  
<img width="100%" alt="대시보드" src="readmeImg\chart_each.png">
select의 option값이 변할때마다 option값을 dispatch해서 새로운 나라의 값을 받아오도록했고 시간 그래프대신 bar차트로 감염자수를 표현했습니다.

- Comment 생성
<img width="100%" alt="대시보드" src="readmeImg\comment_each.png">
로그인을 하지않았다면 글을 볼수있으나 글을 쓸수는 없고 로그인을 하면 Comment를 남길수있는 폼이 생깁니다.  
스트링 데이터만 넘긴다면 그냥 fetch에 댓글 자료를 담아서 POST로 AJAX 요청을 날리고 장고백엔드에서 데이터를 그냥 받아서 저장하면 되지만 이미지는 단순하게 처리할수 없었습니다.  
그래서 window객체의 DataForm()을 새로 생성해서 POST로 보내는 방식을 썼습니다.
<img width="100%" alt="대시보드" src="readmeImg\form_code.png">
text와 image를 useState로 값을 저장하면서 폼으로 만들어서 백엔드쪽으로 보냈고 
<img width="100%" alt="대시보드" src="readmeImg\form_create_code.png">
request데이터에서 Comment에게 필요한 foriegnKey 부분을 각 부모객체의 id를 가져와서 집어넣고 save() 했습니다. 이부분 때문에 CommentAPI를 구성할때 serializer를 2중으로 엮지 못했는데 form데이터 생성/수정 할때처럼 객체를 넣어서 데이터를 저장하는방법을 더 알아보고 개선합니다.  

- comment 삭제  
현재 사용자가 글을 쓴 유저라면 "삭제"버튼이 보이고 삭제시 State에 저장된 Comment의 id를 fetch의 body에 담아서삭제 했습니다
<img width="100%" alt="대시보드" src="readmeImg\comment_delete.png">

- comment 좋아요/싫어요
<img width="100%" alt="대시보드" src="readmeImg\thumbUp.png">
comment와 User를 다:다 매칭해서 조건문으로 현재 내 계정으로 좋아요가 있는지 확인한후에 add/remove로 연결관계를 수정하고 저장합니다

- 최적화
useMemo / useCallback으로 자료와 함수들을 캐싱해서 재 랜더링을 방지합니다. 원래 RestAPI를 Pagination으로 설정하고 그걸 바탕으로 프론트에서도 pagination을 구현하려 했지만 수정된 결과가 전체 state에서 어떤 특정한 데이터인지 알아내는데 실패해서 일단 pagination없이 배포 했습니다



## Deploy
Nginx-Gunicorn-Django를 엮어서 static자료들을 Nginx가 담당하게 설정하고 해당 세팅을 GCP의 Utuntu머신에 (35.232.243.209)주소로 호스팅하고 있습니다




## 후기
프론트에서 자료를 보낼때 이미지를 같이 보내는 방법을 알아내는게 힘들었습니다. 일반적인 fetch로는 string자료밖에 보내지 못해서 FormData()라는 window 폼을 사용했지만 데이터는 생성되지 않았고 따로 parser설정이 필요하단걸 많은 검색후에 찾아내서 데이터를 생성하려 했지만 검색된 예제는 모두 단순한 데이터예제였는데 백단에서 foriegn키를 지정해주는 예시가 없어서 print를 정말 많이 찍어보고 request데이터에 부모키에 대응하는 id를 지정해줌으로써 일단 기능 구현은 마쳤지만 form처럼 부모 객체 자체를 매핑하는 방법이 반드시 있을거라고 생각하고 개선할 예정입니다
