<!-- src/lib/components/ui/OTPInput.svelte -->
<script lang="ts">
	// Define props using $props() and $bindable() for two-way binding
	let { length = 6, value = $bindable("")} = $props();

	// State to hold references to the input elements
	let inputs: HTMLInputElement[] = $state([]);

	// Helper to reconstruct and update the bound value
	function updateValue() {
		value = inputs.map((input) => input.value).join('');
	}

	function handleInput(e: Event, index: number) {
		const target = e.target as HTMLInputElement;
		const val = target.value;

		// Ensure only a single character is kept (in case of mobile autocomplete quirks)
		if (val.length > 1) {
			target.value = val.slice(-1);
		}

		const digit = target.value;

		// Auto-advance to the next input if a digit is entered
		if (digit && index < length - 1) {
			inputs[index + 1]?.focus();
		}

		updateValue();
	}

	function handleKeyDown(e: KeyboardEvent, index: number) {
		// Move to previous input on Backspace if current is empty
		if (e.key === 'Backspace' && !inputs[index].value && index > 0) {
			inputs[index - 1]?.focus();
		}

		// Navigation with arrow keys
		if (e.key === 'ArrowLeft' && index > 0) {
			inputs[index - 1]?.focus();
		}
		if (e.key === 'ArrowRight' && index < length - 1) {
			inputs[index + 1]?.focus();
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pastedData = e.clipboardData?.getData('text') || '';

		// Strip non-digits and limit to the required length
		const digits = pastedData.replace(/\D/g, '').slice(0, length);

		// Fill the inputs with the pasted digits
		digits.split('').forEach((digit, index) => {
			if (inputs[index]) {
				inputs[index].value = digit;
			}
		});

		// Focus the last filled input, or the first empty one if less than length
		const focusIndex = Math.min(digits.length, length - 1);
		inputs[focusIndex]?.focus();

		updateValue();
	}

	function handleFocus(e: FocusEvent) {
		const target = e.target as HTMLInputElement;
		target.select();
	}
</script>

<!-- Container with paste handler -->
<div class="flex gap-2" onpaste={handlePaste}>
	{#each {length}, i}
		<input
			bind:this={inputs[i]}
			type="text"
			inputmode="numeric"
			autocomplete="one-time-code"
			maxlength="1"
			class="flex items-center w-full aspect-square justify-center rounded-lg border border-gray-200 bg-white text-center text-xl font-semibold text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
			oninput={(e) => handleInput(e, i)}
			onkeydown={(e) => handleKeyDown(e, i)}
			onfocus={handleFocus}
			aria-label={`Digit {i + 1} of {length}`}
		/>
	{/each}
</div>
