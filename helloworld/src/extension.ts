import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji'


export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      md.use(markdownItContainer, 'alert', {
        validate: () => true,
        render: (tokens: any, idx: number) => {
          return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
        }
      });

      // Добавляем контейнеры для spoiler
      md.use(markdownItContainer, 'spoiler', {
        marker: '?',
        validate: (params: string): boolean => {
          return params.trim().startsWith('spoiler');
        },
        render: (tokens: any, idx: number): string => {
          const token = tokens[idx];
          if (token.nesting === 1) {
            const title = token.info.trim().replace(/^spoiler\s*/, '') || 'Спойлер';
            return `<details class="spoiler"><summary>${title}</summary>\n`;
          } else {
            return '</details>\n';
          }
        },
      });
      md.use(emoji, { "smile": [ ":)", ":-)" ], "fire": "!!!" } );
      md.use((md: any) => {
        const originalRender = md.renderer.rules.fence || function() {};
        
        md.renderer.rules.fence = (tokens: any, idx: number, options: any, env: any, slf: any) => {
          const token = tokens[idx];
          const info = token.info.trim();

          if (info === 'mermaid') {
            // Обрабатываем блок Mermaid
            const code = token.content.trim();
            return `<div class="mermaid">${code}</div>`;
          }

          return originalRender(tokens, idx, options, env, slf);
        };
      });
      return md;
    }
  };
}
