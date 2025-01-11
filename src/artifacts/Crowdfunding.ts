
/* Autogenerated file, do not edit! */

/* eslint-disable */
import {
  type AbiType,
  AztecAddress,
  type AztecAddressLike,
  CompleteAddress,
  Contract,
  type ContractArtifact,
  ContractBase,
  ContractFunctionInteraction,
  type ContractInstanceWithAddress,
  type ContractMethod,
  type ContractStorageLayout,
  type ContractNotes,
  decodeFromAbi,
  DeployMethod,
  EthAddress,
  type EthAddressLike,
  EventSelector,
  type FieldLike,
  Fr,
  type FunctionSelectorLike,
  L1EventPayload,
  loadContractArtifact,
  type NoirCompiledContract,
  NoteSelector,
  Point,
  type PublicKey,
  PublicKeys,
  type UnencryptedL2Log,
  type Wallet,
  type WrappedFieldLike,
} from '@aztec/aztec.js';
import CrowdfundingContractArtifactJson from '../../target/crowdfunding-Crowdfunding.json' assert { type: 'json' };
export const CrowdfundingContractArtifact = loadContractArtifact(CrowdfundingContractArtifactJson as NoirCompiledContract);


      export type WithdrawalProcessed = {
        amount: (bigint | number)
who: AztecAddressLike
      }
    

/**
 * Type-safe interface for contract Crowdfunding;
 */
export class CrowdfundingContract extends ContractBase {
  
  private constructor(
    instance: ContractInstanceWithAddress,
    wallet: Wallet,
  ) {
    super(instance, CrowdfundingContractArtifact, wallet);
  }
  

  
  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(
    address: AztecAddress,
    wallet: Wallet,
  ) {
    return Contract.at(address, CrowdfundingContract.artifact, wallet) as Promise<CrowdfundingContract>;
  }

  
  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: (bigint | number)) {
    return new DeployMethod<CrowdfundingContract>(PublicKeys.default(), wallet, CrowdfundingContractArtifact, CrowdfundingContract.at, Array.from(arguments).slice(1));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeys(publicKeys: PublicKeys, wallet: Wallet, donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: (bigint | number)) {
    return new DeployMethod<CrowdfundingContract>(publicKeys, wallet, CrowdfundingContractArtifact, CrowdfundingContract.at, Array.from(arguments).slice(2));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof CrowdfundingContract['methods']>(
    opts: { publicKeys?: PublicKeys; method?: M; wallet: Wallet },
    ...args: Parameters<CrowdfundingContract['methods'][M]>
  ) {
    return new DeployMethod<CrowdfundingContract>(
      opts.publicKeys ?? PublicKeys.default(),
      opts.wallet,
      CrowdfundingContractArtifact,
      CrowdfundingContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }
  

  
  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return CrowdfundingContractArtifact;
  }
  

  public static get storage(): ContractStorageLayout<'donation_token' | 'operator' | 'deadline' | 'donation_reciept_notes'> {
      return {
        donation_token: {
      slot: new Fr(1n),
    },
operator: {
      slot: new Fr(2n),
    },
deadline: {
      slot: new Fr(3n),
    },
donation_reciept_notes: {
      slot: new Fr(4n),
    }
      } as ContractStorageLayout<'donation_token' | 'operator' | 'deadline' | 'donation_reciept_notes'>;
    }
    

  public static get notes(): ContractNotes<'UintNote' | 'ValueNote'> {
    return {
      UintNote: {
          id: new NoteSelector(202136239),
        },
ValueNote: {
          id: new NoteSelector(1038582377),
        }
    } as ContractNotes<'UintNote' | 'ValueNote'>;
  }
  

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public declare methods: {
    
    /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
    compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** donate(amount: integer) */
    donate: ((amount: (bigint | number)) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** init(donation_token: struct, operator: struct, deadline: integer) */
    init: ((donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: (bigint | number)) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** public_dispatch(selector: field) */
    public_dispatch: ((selector: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** sync_notes() */
    sync_notes: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** withdraw(amount: integer) */
    withdraw: ((amount: (bigint | number)) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
  };

  
    public static get events(): { WithdrawalProcessed: {abiType: AbiType, eventSelector: EventSelector, fieldNames: string[] } } {
    return {
      WithdrawalProcessed: {
        abiType: {
    "kind": "struct",
    "fields": [
        {
            "name": "amount",
            "type": {
                "kind": "integer",
                "sign": "unsigned",
                "width": 64
            }
        },
        {
            "name": "who",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "inner",
                        "type": {
                            "kind": "field"
                        }
                    }
                ],
                "path": "aztec::protocol_types::address::aztec_address::AztecAddress"
            }
        }
    ],
    "path": "Crowdfunding::WithdrawalProcessed"
},
        eventSelector: EventSelector.fromSignature('WithdrawalProcessed(u64,(Field))'),
        fieldNames: ["amount","who"],
      }
    };
  }
  
}
