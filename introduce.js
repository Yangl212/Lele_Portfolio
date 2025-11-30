document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    const continueBtn = document.getElementById('continueBtn');
    const answerBtn = document.getElementById('answerBtn');
    const callOverlay = document.getElementById('callOverlay');
    const videoFrame = document.getElementById('videoFrame');
    const ringtone = document.getElementById('ringtone');

    const stopRingtone = () => {
        if (!ringtone) return;
        ringtone.pause();
        ringtone.currentTime = 0;
    };

    const startRingtone = () => {
        if (!ringtone) return;
        ringtone.loop = true;
        ringtone.muted = false;

        const tryPlay = () => ringtone.play().catch(() => {});

        // Attempt immediately and again when the tab becomes active.
        tryPlay();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') {
                tryPlay();
            }
        };
        document.addEventListener('visibilitychange', onVisibility, { once: true });

        // Fallback for browsers that block autoplay until a user gesture.
        const unlock = () => {
            tryPlay();
            document.removeEventListener('pointerdown', unlock);
            document.removeEventListener('keydown', unlock);
        };

        document.addEventListener('pointerdown', unlock, { once: true });
        document.addEventListener('keydown', unlock, { once: true });
    };

    const revealVideo = () => {
        if (videoFrame) {
            videoFrame.classList.add('is-visible');
        }
        if (video) {
            video.play().catch(() => {});
        }
        continueBtn.disabled = false;
        continueBtn.classList.remove('is-hidden');
    };

    startRingtone();

    answerBtn.addEventListener('click', () => {
        callOverlay.classList.add('call--hidden');
        stopRingtone();
        revealVideo();
    });

    continueBtn.addEventListener('click', () => {
        window.location.href = 'chat.html';
    });
});
