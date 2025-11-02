<script lang="ts">
  import ServerAboutItem from '$lib/components/ServerAboutItem.svelte';
  import { locale } from '$lib/stores/preferences.store';
  import { type ServerAboutResponseDto, type ServerVersionHistoryResponseDto } from '@immich/sdk';
  import { Alert, Label, Modal, ModalBody } from '@immich/ui';

  import ImmichLogo from '$lib/components/shared-components/immich-logo.svelte';
  import { lemurIconPath } from '$lib/lemur-icon';
  import { DateTime } from 'luxon';
  import { t } from 'svelte-i18n';

  interface Props {
    onClose: () => void;
    info: ServerAboutResponseDto;
    versions: ServerVersionHistoryResponseDto[];
  }

  let { onClose, info, versions }: Props = $props();
  // 🔹 Hardcode Shooter repository info (override any backend Immich links)
  const SHOOTER_REPO = 'sciencehope/shooter';
  const SHOOTER_REPO_URL = 'https://github.com/sciencehope/shooter';
  const SHOOTER_RELEASE_URL = info.version ? `${SHOOTER_REPO_URL}/releases/tag/${info.version}` : SHOOTER_REPO_URL;

  // Optional fallback for missing info fields
  info.repository = SHOOTER_REPO;
  info.repositoryUrl = SHOOTER_REPO_URL;
  info.versionUrl = SHOOTER_RELEASE_URL;
</script>

<Modal icon={lemurIconPath} title={$t('about')} {onClose}>
  <ModalBody>
    <div class="flex flex-col sm:grid sm:grid-cols-2 gap-4">
      {#if info.sourceRef === 'main' && info.repository === 'sciencehope/shooter'}
        <Alert color="warning" title={$t('main_branch_warning')} class="col-span-full" size="small" />
      {/if}

      <!-- Shooter Core Info -->
      <ServerAboutItem id="shooter" title="Shooter" version={info.version} versionHref={info.versionUrl} />
      <ServerAboutItem
        id="repository"
        title={$t('repository')}
        version={info.repository}
        versionHref={info.repositoryUrl}
      />

      {#if info.build && info.buildUrl}
        <ServerAboutItem id="build" title={$t('build')} version={info.build} versionHref={info.buildUrl} />
      {/if}

      {#if info.sourceRef && info.sourceCommit && info.sourceUrl}
        <ServerAboutItem
          id="source"
          title={$t('source')}
          version="{info.sourceRef}@{info.sourceCommit.slice(0, 9)}"
          versionHref={info.sourceUrl}
        />
      {/if}

      <!-- Version History -->
      <div class="col-span-full mt-4">
        <Label size="small" color="primary" for="version-history">{$t('version_history')}</Label>
        <ul id="version-history" class="list-none">
          {#each versions.slice(0, 5) as item (item.id)}
            {@const createdAt = DateTime.fromISO(item.createdAt)}
            <li>
              <span
                class="immich-form-label pb-2 text-xs"
                id="version-history"
                title={createdAt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS, { locale: $locale })}
              >
                {$t('version_history_item', {
                  values: {
                    version: item.version,
                    date: createdAt.toLocaleString(
                      { month: 'short', day: 'numeric', year: 'numeric' },
                      { locale: $locale },
                    ),
                  },
                })}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- ================================ -->
    <!-- Terms of Use & License Section   -->
    <!-- ================================ -->
    <div
      class="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300"
    >
      <h3 class="font-semibold text-sm mb-2">Terms of Use & License Information</h3>

      <p>
        Shooter is a self-hosted photo and video management platform created to help individuals and organizations
        securely store, organize, and manage digital media. By using this software, you agree to follow all applicable
        laws and to use the application responsibly within your own environment.
      </p>

      <p class="mt-2">
        Shooter integrates and builds upon several open-source tools and libraries to provide a complete experience.
        These include <strong>FFmpeg</strong> (video processing), <strong>ExifTool</strong> (metadata extraction),
        <strong>Node.js</strong> (runtime environment), <strong>Libvips</strong> (image manipulation), and other open-source
        frameworks that form essential parts of this system.
      </p>

      <p class="mt-2">
        Portions of Shooter are derived from the open-source project
        <strong>Immich v2.2.0</strong>, Copyright © Immich App Contributors, used and modified under the
        <a
          href="https://www.gnu.org/licenses/agpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline"
        >
          GNU Affero General Public License v3.0
        </a>. These elements have been adapted in compliance with the same license and integrated into the Shooter
        platform.
      </p>

      <p class="mt-2">
        All other tools, libraries, and dependencies retain their respective licenses and remain the intellectual
        property of their authors. Shooter acknowledges the work of the open-source community and is deeply grateful for
        their contributions to modern software development.
      </p>

      <p class="mt-2">
        Shooter itself is distributed under the terms of the
        <a
          href="https://www.gnu.org/licenses/agpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline"
        >
          GNU Affero General Public License v3.0 (AGPL-3.0)
        </a>. The complete source code is publicly available at
        <a
          href="https://github.com/sciencehope/shooter"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline"
        >
          github.com/sciencehope/shooter
        </a>.
      </p>

      <p class="mt-2">
        This application is provided “as-is” without any warranty, express or implied, including but not limited to the
        implied warranties of merchantability or fitness for a particular purpose. The developers and contributors are
        not responsible for any data loss or damages resulting from the use or misuse of this software.
      </p>

      <p class="mt-2">
        By continuing to use Shooter, you acknowledge that you understand and accept these terms and the open-source
        licensing obligations of all included software components.
      </p>
    </div>
  </ModalBody>
</Modal>
