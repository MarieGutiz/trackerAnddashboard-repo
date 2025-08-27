.data
prompt_min:   .asciiz "Enter countdown in minutes: "
label:        .asciiz "Time left: "
alarm_msg:    .asciiz "\n⏰ TIME'S UP! ALARM!\n"
newline:      .asciiz "\n"

#--------=----------
arr_a: .space 20 # 5 E^a each 4 bytes
arr_b: .space 20 # same here
cnt: .word 60

.text
.globl main

main:
    # --- Input minutes ---
    li $v0, 4
    la $a0, prompt_min
    syscall

    li $v0, 5
    syscall
    move $t0, $v0       # t0 = minutes
    li $t1, 0           # t1 = seconds

    li $t2, 0           # tick counter
    li $t3, 5000000     # threshold for tick counter (move outside loop)??

countdown_loop:
    # Increment tick counter
    addi $t2, $t2, 1
    bne $t2, $t3, countdown_loop

    # Reset tick counter
    li $t2, 0

    # --- Print current time ---
    li $v0, 4
    la $a0, label
    syscall

    move $a0, $t0
    jal print_two_digits
    li $v0, 11
    li $a0, ':'
    syscall

    move $a0, $t1
    jal print_two_digits

    li $v0, 4
    la $a0, newline
    syscall

    # --- Decrement seconds ---
    beq $t1, 0, reset_sec
    addi $t1, $t1, -1
    j countdown_loop

reset_sec:
    li $t1, 59
    addi $t0, $t0, -1
    blez $t0, alarm_trigger
    j countdown_loop

alarm_trigger:
    li $v0, 4
    la $a0, alarm_msg
    syscall

    li $v0, 10
    syscall

# -------------------------
# print_two_digits subroutine
# -------------------------
print_two_digits:
    li $t4, 10
    div $a0, $t4
    mflo $t5       # tens
    mfhi $t6       # ones

    addi $t5, $t5, '0'
    li $v0, 11
    move $a0, $t5
    syscall

    addi $t6, $t6, '0'
    li $v0, 11
    move $a0, $t6
    syscall

    jr $ra


#--------=----------
# arr_a[i] = arr_b + cnt
#--------=----------