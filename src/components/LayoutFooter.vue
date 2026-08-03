<script setup lang="ts">
/**
 * LayoutFooter — shared by every page.
 */
import beianEmblem from '@/assets/images/beian-police-emblem.png'
</script>

<template>
  <footer class="layout-footer" data-dom-id="global-footer">
    <div class="layout-footer__inner">
      <div class="layout-footer__left">
        <p class="layout-footer__copy">
          &copy; 2026 MFJip612 &mdash; built with caffeine and curiosity
        </p>
      </div>

      <div class="layout-footer__middle">
        <a
          class="layout-footer__beian"
          href="https://beian.miit.gov.cn"
          rel="noreferrer"
          target="_blank"
        >粤ICP备2026106743号</a>
        <a
          class="layout-footer__beian layout-footer__beian--police"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=44010502004250"
          rel="noreferrer"
          target="_blank"
        >
          <img
            class="layout-footer__beian-icon"
            :src="beianEmblem"
            alt="公网安备"
            aria-hidden="true"
          />
          粤公网安备44010502004250号
        </a>
      </div>

      <div class="layout-footer__right">
        <p class="layout-footer__echo">
          <span class="layout-footer__echo-dollar">$</span> echo &quot;hello world&quot;
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.layout-footer {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--geek-space-lg) 24px 32px;
  border-top: 1px solid var(--geek-border);
}

.layout-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.layout-footer__left,
.layout-footer__middle,
.layout-footer__right {
  display: flex;
  align-items: center;
}

.layout-footer__middle {
  gap: 20px;
}

.layout-footer__copy,
.layout-footer__echo {
  font-family: var(--geek-font-mono);
  font-size: var(--geek-text-xs);
  color: var(--geek-text-tertiary);
  margin: 0;
}

.layout-footer__beian {
  font-family: var(--geek-font-mono);
  font-size: var(--geek-text-xs);
  color: var(--geek-text-tertiary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--geek-brand-500);
  }
}

.layout-footer__beian--police {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.layout-footer__beian-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.layout-footer__echo-dollar {
  color: var(--geek-brand-500);
}

@media (max-width: 640px) {
  .layout-footer__inner {
    flex-direction: column;
    gap: 12px;
  }

  .layout-footer__left,
  .layout-footer__middle,
  .layout-footer__right {
    justify-content: center;
  }
}
</style>
