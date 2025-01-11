use dep::aztec::macros::aztec;

#[aztec]
contract Crowdfunding {
    use dep::aztec::{
        encrypted_logs::encrypted_note_emission::encode_and_encrypt_note,
        macros::{
            events::event,
            functions::{initializer, internal, private, public},
            storage::storage,
        },
        prelude::{AztecAddress, PrivateSet, PublicImmutable},
        protocol_types::traits::Serialize,
        unencrypted_logs::unencrypted_event_emission::encode_event,
        utils::comparison::Comparator,
    };
    use std::meta::derive;
    use dep::value_note::value_note::ValueNote;
    use router::utils::privately_check_timestamp;
    use token::Token;

    #[derive(Serialize)]
    #[event]
    struct WithdrawalProcessed {
        amount: u64,
        who: AztecAddress,
    }

    #[storage]
    struct Storage<Context> {
        // Token used for donations
        donation_token: PublicImmutable<AztecAddress, Context>,
        // Crowd funding operator
        operator: PublicImmutable<AztecAddress, Context>,
        // Deadline for the crowd funding
        deadline: PublicImmutable<u64, Context>,
        // donation reciept notes
        donation_reciept_notes: PrivateSet<ValueNote, Context>,
    }

    #[public]
    #[initializer]
    fn init(donation_token: AztecAddress, operator: AztecAddress, deadline: u64) {
        storage.donation_token.initialize(donation_token);
        storage.operator.initialize(operator);
        storage.deadline.initialize(deadline);
    }

    #[private]
    fn donate(amount: u64){
        // 1) Check that the deadline has not passed --> we do that via the router contract to conceal which contract
        // is performing the check.
        let deadline = storage.deadline.read();
        privately_check_timestamp(Comparator.LT, deadline, &mut context);
        // 2) Transfer the donation token from the sender to the contract
        let donor = context.msg_sender();
        Token::at(storage.donation_token.read())
            .transfer_in_private(donor, context.this_address(), amount as Field, 0)
            .call(&mut context);
        // 3) Create a value note for the donor so that he can later on claim a rewards token in the Claim
        // contract by proving that the hash of this note exists in the note hash tree.
        let mut note = ValueNote::new(amount as Field, donor);

        storage.donation_reciept_notes.insert(&mut note).emit(encode_and_encrypt_note
        (&mut context, donor, donor));
    }

    // Withdraws balance to the operator. Requires that msg_sender() is the operator.
    #[private]
    fn withdraw(amount: u64) {
        // 1) check that message sender is the operator
        let operator_address = storage.operator.read();
        assert(context.msg_sender() == operator_address, "Only the operator can withdraw funds");

        // 2) Transfer the donation token from the contract to the operator
        Token::at(storage.donation_token.read())
        .transfer(operator_address, amount as Field)
        .call(&mut context);

        // 3) Emit an unencrypted event so that anyone can audit how much the operator has withdrawn
        Crowdfunding::at(context.this_address())
        ._publish_donation_receipts(amount, operator_address)
        .enqueue(&mut context);

    }

    #[public]
    #[internal]
    fn _publish_donation_receipts(amount: u64, to: AztecAddress) {
        WithdrawalProcessed { amount, who: to }.emit(encode_event(&mut context));
    }
}