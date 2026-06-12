/* ==========================================================================
   D'ART : THE WEDDING ARCHIVE - INTERACTIVE APP LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Silent Black / Warm Ecru)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('theme-dark')) {
      htmlElement.classList.replace('theme-dark', 'theme-light');
      localStorage.setItem('theme', 'theme-light');
    } else {
      htmlElement.classList.replace('theme-light', 'theme-dark');
      localStorage.setItem('theme', 'theme-dark');
    }
  });

  // Preserve theme preference if previously set
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.className = savedTheme;
  }


  /* --------------------------------------------------------------------------
     2. Navbar Scroll Effect
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* --------------------------------------------------------------------------
     3. Mobile Side Drawer Navigation
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileMenuBtn.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* --------------------------------------------------------------------------
     4. Consultation Modal [상담예약] Event Handlers
     -------------------------------------------------------------------------- */
  const bookingModal = document.getElementById('bookingModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeBookingBtn = document.getElementById('closeBookingBtn');
  
  const openBookingBtn = document.getElementById('openBookingBtn');
  const drawerBookingBtn = document.getElementById('drawerBookingBtn');
  const floatingBookingBtn = document.getElementById('floatingBookingBtn');

  const openModal = () => {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const currentGuests = document.getElementById('guestSlider').value;
    document.getElementById('bookGuests').value = currentGuests;
  };

  const closeModal = () => {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBookingBtn.addEventListener('click', openModal);
  drawerBookingBtn.addEventListener('click', () => {
    closeDrawer();
    openModal();
  });
  floatingBookingBtn.addEventListener('click', openModal);
  
  closeBookingBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);


  /* --------------------------------------------------------------------------
     5. Interactive Guest & Seating Calculator
     -------------------------------------------------------------------------- */
  const guestSlider = document.getElementById('guestSlider');
  const guestCountBadge = document.getElementById('guestCountBadge');
  
  const valBallroomTables = document.getElementById('valBallroomTables');
  const valBallroomDesc = document.getElementById('valBallroomDesc');
  const valBanquetRate = document.getElementById('valBanquetRate');
  const valParkingRate = document.getElementById('valParkingRate');
  
  const pbBallroom = document.getElementById('pbBallroom');
  const pbBanquet = document.getElementById('pbBanquet');
  const pbParking = document.getElementById('pbParking');

  const btnMinusGuest = document.getElementById('btnMinusGuest');
  const btnPlusGuest = document.getElementById('btnPlusGuest');

  const updateCalculator = (guests) => {
    guestCountBadge.textContent = `${guests} 명`;

    const tables = Math.min(30, Math.ceil(guests / 10));
    valBallroomTables.textContent = `${tables} 테이블`;
    
    if (guests < 300) {
      valBallroomDesc.innerHTML = `홀 내부(300석) 여유 테이블 배치<br>(${guests}석 세팅, 쾌적한 간격과 동선 확보)`;
      pbBallroom.style.width = `${(guests / 300) * 100}%`;
    } else if (guests === 300) {
      valBallroomDesc.innerHTML = `홀 내부 300석 만석 배치 완료<br>웅장한 무대 정렬과 압도적 몰입도 선사`;
      pbBallroom.style.width = `100%`;
    } else {
      const overflow = guests - 300;
      valBallroomDesc.innerHTML = `홀 300석 초과 (초과 하객 ${overflow}명)<br>900석 대연회장 중계석으로 안내됩니다`;
      pbBallroom.style.width = `100%`;
    }

    const banquetRate = ((guests / 900) * 100).toFixed(1);
    valBanquetRate.textContent = `${banquetRate}%`;
    pbBanquet.style.width = `${banquetRate}%`;

    const parkingRate = (20 + (guests / 2) / 10).toFixed(1);
    valParkingRate.textContent = `${parkingRate}%`;
    pbParking.style.width = `${parkingRate}%`;
  };

  guestSlider.addEventListener('input', (e) => {
    updateCalculator(parseInt(e.target.value));
  });

  btnMinusGuest.addEventListener('click', () => {
    let val = parseInt(guestSlider.value);
    if (val > 100) {
      val -= 50;
      guestSlider.value = val;
      updateCalculator(val);
    }
  });

  btnPlusGuest.addEventListener('click', () => {
    let val = parseInt(guestSlider.value);
    if (val < 900) {
      val += 50;
      guestSlider.value = val;
      updateCalculator(val);
    }
  });

  updateCalculator(300);


  /* --------------------------------------------------------------------------
     6. Simulated AI Wedding Story Interpreter
     -------------------------------------------------------------------------- */
  // Grammatical Josa (particle) helper for natural Korean phrasing
  const getJosa = (text, type) => {
    if (!text) return '';
    const cleanText = text.trim();
    // Strip HTML tags (like <br>) before checking the last character
    const noHtmlText = cleanText.replace(/<[^>]*>/g, '').trim();
    if (noHtmlText.length === 0) return '';
    const lastChar = noHtmlText.charAt(noHtmlText.length - 1);
    const code = lastChar.charCodeAt(0);
    
    if (code < 0xAC00 || code > 0xD7A3) {
      if (type === '을/를') return '를';
      if (type === '이라는/라는') return '라는';
      return '';
    }
    
    const hasBatchim = (code - 0xAC00) % 28 > 0;
    
    if (type === '을/를') {
      return hasBatchim ? '을' : '를';
    }
    if (type === '이라는/라는') {
      return hasBatchim ? '이라는' : '라는';
    }
    return '';
  };

  const interpretStory = (story) => {
    const raw = story.toLowerCase();
    
    // 1. Same birthday
    if (raw.includes('생일') || raw.includes('태어난 날') || raw.includes('동일한 날') || raw.includes('똑같')) {
      return '태어난 날마저 닮은 기적 같은 운명적 우연을 통해,<br>평생 같은 속도로 하나의 궤적을 걷게 될 두 사람의 서사';
    }
    // 2. Coffee / Cafe Encounter
    if (raw.includes('커피') || raw.includes('카페') || raw.includes('바리스타') || raw.includes('에스프레소') || raw.includes('아메리카노')) {
      return '향긋한 커피 향과 따스한 대화가 깃든 카페처럼,<br>은은하게 서로의 일상으로 스며든 따뜻한 인연';
    }
    // 3. College / Campus
    if (raw.includes('대학') || raw.includes('캠퍼스') || raw.includes('동아리') || raw.includes('학생') || raw.includes('학교')) {
      return '초록빛 캠퍼스 교정에서 풋풋하게 시작되어,<br>오랜 시간 쌓아온 신뢰로 세워올린 건축적인 동행';
    }
    // 4. Travel / Journey
    if (raw.includes('여행') || raw.includes('비행기') || raw.includes('공항') || raw.includes('해외') || raw.includes('낯선')) {
      return '낯선 길 위에서 우연처럼 발걸음이 겹쳐져,<br>이제는 평생을 함께 항해하는 아름다운 여정';
    }
    // 5. Books / Reading
    if (raw.includes('책') || raw.includes('도서관') || raw.includes('독서') || raw.includes('문장')) {
      return '서로의 서재에 꽂힌 다정한 문장들을 공유하듯,<br>결이 깊은 교감으로 어우러지는 지적인 조화';
    }
    // 6. Office / Work
    if (raw.includes('회사') || raw.includes('직장') || raw.includes('동료') || raw.includes('사내') || raw.includes('일하')) {
      return '분주한 현실의 공간 속에서 서로의 버팀목이 되어주며,<br>함께 빚어낸 성숙하고 견고한 삶의 협주곡';
    }

    // Default Fallback
    let cleaned = story.trim();
    if (cleaned.endsWith('.')) {
      cleaned = cleaned.slice(0, -1);
    }
    if (cleaned.length > 30) {
      cleaned = cleaned.substring(0, 30) + '...';
    }
    return `'${cleaned}'의 소중한 인생 조각들을 모아,<br>단 하나의 독창적인 예술로 빚어내는 기록`;
  };

  const aiDirectorForm = document.getElementById('aiDirectorForm');
  const aiResultCard = document.getElementById('aiResultCard');
  
  const aiPlaceholderState = document.getElementById('aiPlaceholderState');
  const aiLoadingState = document.getElementById('aiLoadingState');
  const aiOutputState = document.getElementById('aiOutputState');
  
  const outSlogan = document.getElementById('outSlogan');
  const outNames = document.getElementById('outNames');
  const outVows = document.getElementById('outVows');
  
  const outSpecVirgin = document.getElementById('outSpecVirgin');
  const outSpecCeiling = document.getElementById('outSpecCeiling');
  const outSpecTables = document.getElementById('outSpecTables');

  aiDirectorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const groom = document.getElementById('groomName').value.trim();
    const bride = document.getElementById('brideName').value.trim();
    const story = document.getElementById('loveStory').value.trim();
    const mood = document.querySelector('input[name="weddingMood"]:checked').value;

    aiPlaceholderState.classList.add('d-none');
    aiOutputState.classList.add('d-none');
    aiLoadingState.classList.remove('d-none');

    setTimeout(() => {
      aiLoadingState.classList.add('d-none');
      aiOutputState.classList.remove('d-none');

      outNames.textContent = `${groom} & ${bride}`;

      let sloganText = '';
      let virginRoadText = '';
      let ceilingText = '';
      let tableText = '';
      let vowsTemplate = '';

      const interpretedStory = interpretStory(story);

      if (mood === 'theatrical') {
        sloganText = "FROM ROUTINE TO MASTERPIECE<br>THE DRAMATIC HEAVEN";
        virginRoadText = "32m 버진로드를 따라 딥블랙 매트 미러 타일과 수백 개의 은은한 캔들 라이트 배치, 극적인 명암 대비 연출";
        ceilingText = "9m 층고에서 떨어지는 기하학적 샹들리에의 핀조명으로 오직 두 사람에게만 시선이 쏟아지는 연극적 효과 극대화";
        tableText = "미드나잇 블랙 실크 덮개와 브론즈 식기, 벨벳 플라워 오브제로 테이블 장식 및 어쿠스틱 첼로 라이브";
        
        vowsTemplate = `당연했던 일상(Routine) 속에서 피어난 서로라는 빛이<br>
          이제 디'아트 아카이브의 웅장한 9m 층고 아래<br>
          하나의 극적인 핀조명이 되어 쏟아집니다.<br><br>
          <strong>${interpretedStory}</strong>${getJosa(interpretedStory, '을/를')} 마주하며,<br>
          ${groom} 님과 ${bride} 님은 서로의 길을 조용히 비춰주는<br>
          세상에 단 하나뿐인 마스터피스가 되어,<br>
          서로의 삶을 영원히 기록하고 아카이브할 것을 약속합니다.`;
      } 
      else if (mood === 'architectural') {
        sloganText = "FROM ROUTINE TO MASTERPIECE<br>ARCHITECTURAL ELEGANCE";
        virginRoadText = "32m 버진로드를 대리석 마블 타일로 장식하고 브론즈 메탈 스탠드로 기하학적 직선의 미학을 강조";
        ceilingText = "9m 높이를 수놓는 웅장한 그리드 형태의 천장 면조명과 크리스털 오브제로 완벽한 대칭적 공간감 선사";
        tableText = "화이트 대리석 플레이트와 브론즈 커틀러리, 싱그러운 유칼립투스 배치 및 차분한 하프 듀엣 연주";
        
        vowsTemplate = `가장 정갈한 선 & 면으로 맞물려 완성되는 건축 예술처럼,<br>
          ${groom} 님과 ${bride} 님은 서로의 다른 일상(Routine)을 모아<br>
          견고한 하나의 집(Masterpiece)을 짓습니다.<br><br>
          <strong>${interpretedStory}</strong>${getJosa(interpretedStory, '이라는/라는')} 신뢰를 바탕으로,<br>
          디'아트 아카이브의 영원한 프레임 안에서 흐트러짐 없이<br>
          동일한 시선으로 앞날을 조각해 나갈 것을 엄숙히 서약합니다.`;
      } 
      else { // luminous
        sloganText = "FROM ROUTINE TO MASTERPIECE<br>THE LUMINOUS LIGHT";
        virginRoadText = "32m 버진로드를 에크루 패브릭으로 감싸고 풍성한 계절 야생화들과 입체 파스텔 톤 샹들리에 잔영 연출";
        ceilingText = "9m 천장에서 폭포수처럼 드레이핑되는 시폰 패브릭과 크리스털 샹들리에가 신부를 가장 입체적으로 밝힘";
        tableText = "은은한 에크루 레이스 러너와 로즈골드 촛대, 프라이빗 쇼룸 무드의 센터피스 및 플루트 & 바이올린 하모니";
        
        vowsTemplate = `따스한 아침 햇살을 담아내는 양피지(Warm Ecru) 필사본처럼,<br>
          ${groom} 님과 ${bride} 님은 두 사람만의 다정한 기록(Routine)을 엮어<br>
          하나의 문학 명작(Masterpiece)을 집필합니다.<br><br>
          <strong>${interpretedStory}</strong>의 따뜻한 호흡 위에서,<br>
          크리스털 조명이 환하게 밝혀주는 이 첫 페이지처럼<br>
          어떤 날씨 속에서도 서로의 든든한 조력자가 될 것을 약속합니다.`;
      }

      outSlogan.innerHTML = sloganText;
      outVows.innerHTML = vowsTemplate;
      outSpecVirgin.textContent = virginRoadText;
      outSpecCeiling.textContent = ceilingText;
      outSpecTables.textContent = tableText;

      aiResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    }, 2000);
  });

  const btnShareInvite = document.getElementById('btnShareInvite');
  btnShareInvite.addEventListener('click', () => {
    alert("두 분만의 D'ART AI 웨딩 제안서가 임시 보관함에 아카이브되었습니다. 고유 링크 복사 기능이 활성화됩니다.");
  });


  /* --------------------------------------------------------------------------
     7. Booking Form / Success Dialog Handler
     -------------------------------------------------------------------------- */
  const bookingForm = document.getElementById('bookingForm');
  const successDialog = document.getElementById('successDialog');
  const successOverlay = document.getElementById('successOverlay');
  const successMessage = document.getElementById('successMessage');
  const successDetailCard = document.getElementById('successDetailCard');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookGroom = document.getElementById('bookGroomName').value.trim();
    const bookBride = document.getElementById('bookBrideName').value.trim();
    const bookContact = document.getElementById('bookContact').value.trim();
    const bookDate = document.getElementById('bookDate').value;
    const bookGuests = document.getElementById('bookGuests').value;
    const bookTime = document.getElementById('bookTime').value;

    const visitPaths = [];
    document.querySelectorAll('input[name="visitPath"]:checked').forEach(cb => {
      const nameMap = {
        'instagram': '인스타그램',
        'blog': '블로그/카페',
        'friend': '지인 추천',
        'walkin': '엔터식스 워크인',
        'planner': '웨딩 플래너',
        'outdoor': '지면 광고'
      };
      visitPaths.push(nameMap[cb.value] || cb.value);
    });

    const visitPathStr = visitPaths.length > 0 ? visitPaths.join(', ') : '기타/미표기';

    successMessage.innerHTML = `고객님께서 작성해 주신 소중한 기록은 단 하루의 예식을 넘어, 두 사람만을 위한 완벽한 예술작품(Masterpiece)을 빚어내는 밑그림이 됩니다.<br>제공해주신 상세한 정보를 토대로 <strong>6층 상담실</strong>에서 더욱 디테일한 프라이빗 예식 기획을 도와드리겠습니다.`;
    
    successDetailCard.innerHTML = `
      <div class="dialog-card-row">
        <span class="dialog-card-label">예약자 성함</span>
        <span class="dialog-card-val">${bookGroom} ♡ ${bookBride}</span>
      </div>
      <div class="dialog-card-row">
        <span class="dialog-card-label">연락처</span>
        <span class="dialog-card-val">${bookContact}</span>
      </div>
      <div class="dialog-card-row">
        <span class="dialog-card-label">예식 희망일</span>
        <span class="dialog-card-val">${bookDate}</span>
      </div>
      <div class="dialog-card-row">
        <span class="dialog-card-label">방문 예약 시간</span>
        <span class="dialog-card-val">${bookTime} (6층 예약실)</span>
      </div>
      <div class="dialog-card-row">
        <span class="dialog-card-label">예상 하객 수</span>
        <span class="dialog-card-val">${bookGuests} 명</span>
      </div>
      <div class="dialog-card-row">
        <span class="dialog-card-label">방문 경로</span>
        <span class="dialog-card-val" style="max-width: 200px; text-align: right; word-break: keep-all;">${visitPathStr}</span>
      </div>
    `;

    closeModal();
    successDialog.classList.add('active');
    document.body.style.overflow = 'hidden';
    bookingForm.reset();
  });

  const closeSuccess = () => {
    successDialog.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeSuccessBtn.addEventListener('click', closeSuccess);
  successOverlay.addEventListener('click', closeSuccess);


  /* --------------------------------------------------------------------------
     8. Space Card Ballroom Slideshow Logic
     -------------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideshowInterval;

  const showSlide = (index) => {
    if (slides.length === 0 || dots.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  };

  const startSlideshow = () => {
    slideshowInterval = setInterval(nextSlide, 4500);
  };

  const resetSlideshow = () => {
    clearInterval(slideshowInterval);
    startSlideshow();
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-slide'));
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        resetSlideshow();
      }
    });
  });

  if (slides.length > 1) {
    startSlideshow();
  }

});
