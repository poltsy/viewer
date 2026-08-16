/*
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'

const STORAGE_KEY = 'nextcloud-viewer-video-settings'

function load() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
	} catch (e) {
		return {}
	}
}

const saved = load()

const state = Vue.observable({
	volume: saved.volume ?? 1,
	muted: saved.muted ?? false,
	loop: saved.loop ?? false,
	speed: saved.speed ?? 1,
})

function persist() {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	} catch (e) {
		// storage unavailable (private browsing, quota, etc), ignore
	}
}

export default {
	state,
	setVolume(volume) {
		state.volume = volume
		persist()
	},
	setMuted(muted) {
		state.muted = muted
		persist()
	},
	setLoop(loop) {
		state.loop = loop
		persist()
	},
	setSpeed(speed) {
		state.speed = speed
		persist()
	},
}
